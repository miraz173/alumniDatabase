import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import mysql from "mysql";
import cors from "cors";

const ip = '192.168.68.100';
const app = express();
app.use(cors());
app.use(express.json());

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cse3100",
});

app.get("/", (req, res) => {
  console.clear();
  console.log('get called');
  const query = req.query.query;
  const searchQuery = (query && query.toString().trim()) || "RUET";
  // console.log("input text:", searchQuery);

  const keywords = searchQuery.split(",").map((keyword) => keyword.trim());
  const keywordList = keywords.map((keyword) => `'${keyword}'`).join(",");
  const keywordList2 = keywords.map((keyword) => `'%${keyword}%'`).join(" or keywords.attribute like ");
  // console.log(keywordList2);

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
    } else {
      connection.query(sql2, (error, results) => {
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

app.post("/", (req, res) => {
  console.clear();
  console.log('post called');

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
    person.password
  ];

  const sql = `
    INSERT INTO cse3100.alumni (roll, name, thumbnail, image, position, higherEd, company, city, state, country, contacts, about, attributes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) as pdata
    ON DUPLICATE KEY UPDATE
      name = pdata.name,
      thumbnail = pdata.thumbnail,
      image = pdata.image,
      position = pdata.position,
      company = pdata.company,
      higherEd = pdata.higherEd,
      city = pdata.city,
      state = pdata.state,
      country = pdata.country,
      contacts = pdata.contacts,
      about = pdata.about,
      attributes=pdata.attributes;
    `; //doesn't have password verification embedded in it.

  const sql2 = `INSERT INTO cse3100.alumni (roll, name, thumbnail, image, position, company, higherEd, city, state, country, contacts, about, attributes)
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
  `

  dbPool.getConnection((err, connection) => {
    if (err) {
      console.log("Error connecting to MySQL:", err);
      res.sendStatus(500);
    } else {
      connection.query(sql2, personArr, (error, results) => {
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

app.post("/login", (req, res) => {
  const { roll, password } = req.body;

  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.sendStatus(500);
    } else {
      const query = "SELECT * FROM users WHERE roll = ?";
      connection.query(query, [roll], (error, results) => {
        connection.release();
        if (error) {
          console.error("Database query error:", error);
          res.sendStatus(500);
        } else {
          if (results.length > 0) {
            const user = results[0];

            const providedPasswordUtf8 = Buffer.from(
              password.trim(),
              "utf-8"
            ).toString("utf-8");
            const storedPasswordUtf8 = Buffer.from(
              user.password.trim(),
              "utf-8"
            ).toString("utf-8");

            // Compare the passwords

            // stored password is in hashed form
            // bcrypt.compare(
            //   providedPasswordUtf8,
            //   storedPasswordUtf8,
            //   (bcryptError, bcryptResult) => {
            //     if (bcryptError) {
            //       console.error("Bcrypt error:", bcryptError);
            //       res.sendStatus(500);
            //     } else if (bcryptResult) {
            //       console.log("Password matched!");
            //       // If passwords match, generate a JWT and send it as a response
            //       const token = jwt.sign({ userId: user.roll }, "your_secret_key", {
            //         expiresIn: "1h",
            //       });
            //       res.json({ token });
            //     } else {
            //       console.log("Passwords don't match:", password, user.password);
            //       // Passwords don't match
            //       res.status(401).json({ message: "Authentication failed" });
            //     }
            //   }
            // );

            // stored password is non hashed password
            if (providedPasswordUtf8 === storedPasswordUtf8) {
              console.log("Password matched!");
              // If passwords match, generate a JWT and send it as a response
              const token = jwt.sign({ userId: user.roll }, "your_secret_key", {
                expiresIn: "1h",
              });
              res.json({ token });
            } else {
              console.log("Passwords don't match:", password, user.password);
              // Passwords don't match
              res.status(401).json({ message: "Authentication failed" });
            }

          }
          else {
            console.log("user not found !");
            // User not found
            res.status(401).json({ message: "Authentication failed" });
          }
        }
      });
    }
  });
});

app.post("/kahoot", (req, res) => {
  console.log('kahoot called');
  let sql = `SELECT attribute, COUNT(*) AS attCount
  FROM keywords
  GROUP BY attribute
  ORDER BY attCount DESC
  LIMIT 7;`;
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
})

app.listen(3001, ip, () => {
  console.log("Server is running on port 3001");
});
