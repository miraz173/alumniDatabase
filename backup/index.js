import express from "express";
import mysql from "mysql";
import cors from "cors";

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "test",
// });

const app = express();
app.use(cors());
// app.use(express.json());

// app.get("/", async (req, res) => {
//     try {
//       const query1=`SELECT alumni.*, GROUP_CONCAT(keywords.keywords separator', ') AS keywords
//       FROM alumni LEFT JOIN keywords ON keywords.roll = alumni.roll GROUP BY alumni.roll`;
//       const data1 = await new Promise((resolve, reject) => {
//         db.query(query1, (err, data) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(data);
//           }
//         });
//       });

//       return res.json(data1);
//     } catch (err) {
//       return res.json(err);
//     }
//   });

// app.post("/", (req, es) => {
//   const q = "insert into lab6.salary values(?)";
//   const values = ["x", "17-03-2001", "4"];
//   db.query(q, [values]);
// });

// app.listen(3001, () => {
//   console.log("hiya kids!\n");
// });

// const express = require('express');
// const app = express();
// const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

app.get("/", (req, res) => {
  const query = req.query.query;

  let sql = `SELECT a.*, GROUP_CONCAT(k.keyword) AS keywords, 
  ( SELECT GROUP_CONCAT(CONCAT('phone ', c.phone, ',email ', c.email, ',whatsapp ', whatsapp, ',discord ', discord, ',twitter ', twitter) SEPARATOR ', ')
    FROM contacts c
    WHERE c.roll = a.roll
  ) AS contacts
  FROM alumni a
  JOIN keywords k ON a.roll = k.roll
  WHERE a.roll IN `;
  let searchQuery = { query }; //query is an object containing one variable named query.
  searchQuery =
    searchQuery.query.toString().length > 0 ? searchQuery.query : `RUET`;
  console.log("input text: " + searchQuery);

  let sq = searchQuery.split(",");
  for (let i = 0; i < sq.length; i++) {
    //remove unwanted space from elements
    let dec = 0;
    if (sq[i][0] == " ") {
      sq[i] = sq[i].slice(1);
      if (sq[i][0] == " ") dec = 1; //work with same element by decrementing i if space still exists at beginning
    }
    if (sq[i][sq[i].length - 1] == " ") {
      sq[i] = sq[i].slice(0, -1);
      if (sq[i][sq[i].length - 1] == " ") dec = 1; //if ' ' still remains at end of string, process that string again to remove the space
    }
    dec == 1 ? i-- : i; //decrement i to reprocess the string again to remove space at beginning or at end
  }

  if (searchQuery.split(",").length == 1) {
    sql += `
    ( SELECT roll
      FROM keywords
      WHERE keyword LIKE ?
    ) GROUP BY a.roll;`;
    searchQuery = `%` + sq[0] + `%`;
    console.log("modified key: " + searchQuery);
  } 
  else {
    const keywordList = sq.map((keyword) => `'${keyword}'`).join(","); //[ab, cd]-->'ab','cd'
    console.log("modified keys: " + keywordList);
    sql += `
    ( SELECT a.roll FROM alumni a 
      JOIN keywords k ON a.roll = k.roll 
      WHERE k.keyword IN (${keywordList}) 
      GROUP BY a.roll, a.name 
      HAVING COUNT(DISTINCT k.keyword) = ${sq.length} 
    ) GROUP BY a.roll, a.name;`;
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.sendStatus(500);
    } else {
      connection.query(sql, [searchQuery], (error, results) => {
        connection.release(); // Release the connection back to the pool
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

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
