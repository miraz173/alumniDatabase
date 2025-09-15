import express from "express";
import bcrypt from "bcrypt";
import mysql from "mysql2";
import cors from "cors";

let saltRounds = 10;
const port = process.env.PORT || 3001;
const app = express();

async function dbFetch(sql, params = []) {
  const getConnection = (pool) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        else resolve(connection);
      });
    });
  };

  const runQuery = (connection, sql, params) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  };

  let connection;
  try {
    connection = await getConnection(dbPool);

    console.log("\n[DB QUERY]");
    console.log("SQL:", sql);
    console.log("Params:", params);

    const results = await runQuery(connection, sql, params);

    console.log("[DB RESULT]", results);
    return results;
  } catch (err) {
    console.error("[DB ERROR]", err);
    throw err; // rethrow so caller can handle
  } finally {
    if (connection) connection.release();
  }
}//const user = await dbFetch("SELECT * FROM users WHERE roll = ?", [101]);


async function dbTransaction(queries = []) {
  // queries = [{ sql: "...", params: [...] }, ...]

  let connection;
  try {
    connection = await new Promise((resolve, reject) => {
      dbPool.getConnection((err, conn) => {
        if (err) reject(err);
        else resolve(conn);
      });
    });

    await new Promise((resolve, reject) =>
      connection.beginTransaction((err) => (err ? reject(err) : resolve()))
    );

    let results = [];
    for (let { sql, params } of queries) {
      console.log("\n[DB TX QUERY]");
      console.log("SQL:", sql);
      console.log("Params:", params);

      let res = await new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
      results.push(res);
    }

    await new Promise((resolve, reject) =>
      connection.commit((err) => (err ? reject(err) : resolve()))
    );

    console.log("[DB TX COMMIT SUCCESS]");
    return results;
  } catch (err) {
    if (connection) {
      await new Promise((resolve) => connection.rollback(() => resolve()));
      console.error("[DB TX ROLLBACK]", err);
    }
    throw err;
  } finally {
    if (connection) connection.release();
  }
}
// await dbTransaction([
//   {
//     sql: "INSERT INTO alumni (roll, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=?",
//     params: [101, "Moshiur", "Moshiur"]
//   },
//   {
//     sql: "DELETE FROM keywords WHERE roll = ?",
//     params: [101]
//   },
//   {
//     sql: "INSERT INTO keywords (roll, attribute) VALUES (?, ?), (?, ?)",
//     params: [101, "RUET", 101, "CSE"]
//   }
// ]);


app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " + // Allow resources from your own domain
    "img-src 'self' https://alumniserver.up.railway.app https://res.cloudinary.com data:; " + // Allow images from your domain, Cloudinary, and data URIs
    "script-src 'self' 'unsafe-inline' https://widget.cloudinary.com https://upload-widget.cloudinary.com; " + // Allow scripts from your domain, Cloudinary widget, and inline scripts (use 'unsafe-inline' with caution or a nonce)
    "style-src 'self' 'unsafe-inline';" + // Allow styles from your domain and inline styles
    "connect-src 'self' https://alumniserver.up.railway.app;" // Allow connections to your backend
  );
  next();
});

app.use(cors());
app.use(express.json());
config();

const dbPool = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  port: process.env.db_port,
  password: process.env.db_pass,
  database: process.env.db_db,
  ssl: {
    rejectUnauthorized: false, // Aiven requires SSL
  },
});

app.get("/search", (req, res) => {//search by keywords
  const query = req.query.query;
  const searchQuery = (query && query.toString().trim().slice(1)) || "RUET";
  // console.log("input text:", searchQuery, query);

  const keywords = searchQuery.split(",").map((keyword) => keyword.trim());
  const keywordList = keywords.map((keyword) => `'${keyword}'`).join(",");
  const keywordList2 = keywords
    .map((keyword) => `'%${keyword}%'`)
    .join(" or keywords.attribute like ");
  // console.log(keywordList2, keywords);

  const sql = `
  select  a.*, 
  CONCAT_WS(', ', a.roll, higherEd, state, country, attributes) AS keywords 
  from alumni a
  join keywords on keywords.roll=a.roll 
  where keywords.attribute in (${keywordList})
  GROUP BY a.roll
  HAVING COUNT(DISTINCT keywords.attribute) = ${keywords.length};`;

  const sql2 = `
  select  a.*, 
  CONCAT_WS(', ', a.roll, higherEd, state, country, attributes) AS keywords 
  from alumni a
  join keywords on keywords.roll=a.roll 
  where keywords.attribute like ${keywordList2}
  GROUP BY a.roll
  HAVING COUNT(DISTINCT keywords.attribute) = ${keywords.length};`;

  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.sendStatus(500);
    } else if (!query || query.length < 2) {
      res.json([]); // empty query
    } else {
      let qry = query[0] === "1" ? sql : sql2;
      connection.query(qry, (error, results) => {
        connection.release();
        if (error) {
          console.error("Database query error:", error);
          res.sendStatus(500);
        } else {
          res.json(results);
        }
      });
    }
  });
});

app.post("/editProfile", async (req, res) => {//edit profile

  const person = req.body;
  const personArr = [
    person.roll,
    person.name,
    person.thumbnail,
    person.image,
    person.position,
    person.company,
    person.higherEd,
    person.city,
    person.state,
    person.country,
    person.contacts,
    person.about,
    person.attributes,
    person.password,
  ];
  // Prepare sql2 query for insertion/updation into alumni
  // Using INSERT ... SELECT ... WHERE EXISTS to ensure roll and password match
  // Using ON DUPLICATE KEY UPDATE to handle existing records
  const sql2 = `INSERT INTO alumni (roll, name, thumbnail, image, position, company, higherEd, city, state, country, contacts, about, attributes)
  SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  FROM DUAL
  WHERE EXISTS (
    SELECT 1
    FROM users
    WHERE users.roll = roll AND users.password = ?
  )
  ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    thumbnail = VALUES(thumbnail),
    image = VALUES(image),
    position = VALUES(position),
    company = VALUES(company),
    higherEd = VALUES(higherEd),
    city = VALUES(city),
    state = VALUES(state),
    country = VALUES(country),
    contacts = VALUES(contacts),
    about = VALUES(about),
    attributes = VALUES(attributes);
  `;

  // Build keyword list
  let str = `${person.name},${person.roll},${person.position},${person.company},${person.higherEd},${person.city},${person.state},${person.country},${person.attributes}`;
  let strArr = str
    .split(",")
    .map((item) => item.trim())
    .filter((item) => (item !== "" && item !== undefined && item !== null)) // Remove empty elements
    .map((item) => item.toLowerCase());

  strArr = [...new Set(strArr)]; // unique keywords

  // Prepare sql3 query for deletion and insertion into keywords
  let sql3 = `DELETE FROM keywords WHERE roll = ?`;
  let sql4 = `INSERT INTO cse3100.keywords (roll, attribute) VALUES `;

  let rollKeywordPairs = [];
  strArr.forEach((item, index) => {
    if (index === 0) {
      sql4 += "(?, ?)";
    } else {
      sql4 += ", (?, ?)";
    }
    rollKeywordPairs.push(person.roll, item);
  });
  sql4 += ";";

  const results = await dbTransaction([
    { sql: sql2, params: [...personArr] },
    { sql: sql3, params: [person.roll] },
    { sql: sql4, params: rollKeywordPairs }
  ]);

  console.log(`profile edit request sent by ${person.roll}: ${results}`);
  res.json({ message: "Profile update request processed.", status: "success" });
});

app.post("/registerProfile", async (req, res) => {
  const person = req.body;

  try {
    // Check if user already exists
    const checkSql = `SELECT 1 FROM users WHERE roll = ? LIMIT 1`;
    const existingUser = await dbFetch(checkSql, [person.roll]); // dbfetch = single query helper

    if (existingUser.length > 0) {
      return res.json({
        message: "User already exists. Please use updateProfile.",
        userExists: 1,
        status: "failed"
      });
    }

    // Hash password
    person.password = await bcrypt.hash(person.password, saltRounds);
    console.log('Hashed password:', person.password);

    // Insert into users
    const sql1 = `INSERT INTO users (roll, password) VALUES (?, ?)`;
    const sql1params = [person.roll, person.password];

    // Insert into alumni
    const sql2 = `
      INSERT INTO alumni (
        roll, name, thumbnail, image, position, company, higherEd,
        city, state, country, contacts, about, attributes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const sql2params = [
      person.roll,
      person.name,
      person.thumbnail,
      person.image,
      person.position,
      person.company,
      person.higherEd,
      person.city,
      person.state,
      person.country,
      person.contacts,
      person.about,
      person.attributes
    ];

    // Build keyword list
    let str = `${person.name},${person.roll},${person.position},${person.company},${person.higherEd},${person.city},${person.state},${person.country},${person.attributes}`;
    let strArr = str
      .split(",")
      .map((item) => item.trim())
      .filter((item) => (item !== "" && item !== undefined && item !== null)) // Remove empty elements
      .map((item) => item.toLowerCase());

    strArr = [...new Set(strArr)]; // unique keywords

    // Insert keywords
    let sql3 = `INSERT INTO keywords (roll, attribute) VALUES `;
    let rollKeywordPairs = [];
    strArr.forEach((item, index) => {
      sql3 += index === 0 ? "(?, ?)" : ", (?, ?)";
      rollKeywordPairs.push(person.roll, item);
    });
    sql3 += ";";

    // Run all in transaction
    const results = await dbTransaction([
      { sql: sql1, params: sql1params },
      { sql: sql2, params: sql2params },
      { sql: sql3, params: rollKeywordPairs }
    ]);

    console.log(`Profile creation request by ${person.roll}: ${results}`);
    res.json({ message: "Profile created successfully.", status: "success" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.post("/changePassword", async (req, res) => {
  try {
    req.body.newPass = await bcrypt.hash(req.body.newPass, saltRounds);
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  } catch (err) {
    return res.status(500).json({ message: "Error hashing password" });
  }

  let query = `UPDATE users u JOIN ( SELECT roll FROM users WHERE roll = ? AND password = ? ) subquery ON u.roll = subquery.roll SET u.password = ?;`;

  let params = [
    req.body.roll,
    req.body.password,
    req.body.newPass,
  ];

  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.sendStatus(500);
    } else {
      connection.query(query, params, (error, results) => {
        connection.release();
        if (error) {
          console.error("Database query error:", error);
          res.sendStatus(500);
          return;
        } else {
          console.log(`password change request sent by ${req.body.roll}`);
          console.log(params);
          res.json(results);
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { roll, password } = req.body;
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.sendStatus(500);
    } else {
      const query = "SELECT * FROM users WHERE roll = ?";
      connection.query(query, [roll], async (error, results) => {
        connection.release();
        if (error) {
          console.error("Database query error:", error);
          res.sendStatus(500);
        } else {
          if (results.length > 0) {
            const user = results[0];

            const providedPasswordUtf8 = Buffer.from(//provided password is in plain text
              password.trim(),
              "utf-8"
            ).toString("utf-8");
            const storedPasswordUtf8 = Buffer.from(//stored password is in hashed form
              user.password.trim(),
              "utf-8"
            ).toString("utf-8");

            const isMatch = await bcrypt.compare(providedPasswordUtf8, storedPasswordUtf8);
            if (isMatch) {
              console.log("Password matched!");
              const sql = `
                SELECT a.*, GROUP_CONCAT(k.attribute SEPARATOR ', ') AS keywords 
                FROM alumni a
                LEFT JOIN keywords k ON k.roll = a.roll
                WHERE a.roll = ?
                GROUP BY a.roll;
                `;

              dbFetch(sql, [roll]).then((personResults) => {
                const person = personResults[0] || null;
                console.log("person data: ", person);
                res.json({ person });
              });
            } else {
              console.log("Passwords don't match:", password, user.password);
              res.status(401).json({ message: "Authentication failed" });
            }
          } else {
            console.log("user not found !");
            res.status(401).json({ message: "Authentication failed" });
          }
        }
      });
    }
  });
});

let i = 0;
app.get("/topKeywords", (req, res) => {
  console.log(`Landing Page loaded for ${i++} times`);
  let sql = `SELECT attribute, COUNT(*) AS attCount
  FROM keywords
  GROUP BY attribute
  ORDER BY attCount DESC
  LIMIT 6;`;
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.log("Error connecting to MySQL:", err);
      res.sendStatus(500);
    } else {
      connection.query(sql, (error, results) => {
        connection.release();
        if (error) {
          console.error("Database query error:", error);
          res.sendStatus(500);
        } else {
          res.json(results);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} since ${new Date().toLocaleString()}, ain't it?`);
});

