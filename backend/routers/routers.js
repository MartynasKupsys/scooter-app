import express from "express";
import mysql from "mysql";
const router = express.Router();

const connection = mysql.createConnection({
  host: "192.168.88.39",
  user: "root",
  password: "-EV8Drejas!89",
  database: "kolt_db",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// pagrindinis puslapis
router.get("/", (req, res) => {
  res.send("Hello World!");
});

// KOLT_DB

//CREATE
router.post("/kolt", (req, res) => {
  console.log(req.body);
  const sql = `
      INSERT INTO kolt_scooters (scooter_name, registration_code)
      VALUES (?, ?)
    `;
  connection.query(sql, [req.body.name, req.body.code], function (error, results, fields) {
    if (error) throw error;
    console.log(req.body);
    res.json({ message: "OK" });
  });
});

// GET LIST
router.get("/kolt", (req, res) => {
  const sql = `
      SELECT id, scooter_name, creation_date,registration_code, is_busy, last_use_date, total_ride_kilometres  FROM kolt_scooters`;

  connection.query(sql, function (error, result, fields) {
    try {
      console.log(result);
      if (error) throw error.code;
    } catch {
      console.log(error.code);
    }
    res.json(result);
  });
});

// DELETE
router.delete("/kolt/:id", (req, res) => {
  const sql = `DELETE FROM kolt_scooters WHERE id = ${req.params.id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json({ message: "OK" });
  });
});

// SU PREPARE STATEMENT
// router.delete("/zoo/:id", (req, res) => {
//   const sql = `DELETE FROM zoo_museum WHERE id = ?`;
//   connection.query(sql, [req.params.id], function (error, results, fields) {
//     if (error) throw error;
//     res.json({ message: "OK" });
//   });
// });

// // UPDATE BY ID
// router.put("/zoo/:id", (req, res) => {
//   const sql = `
//       UPDATE zoo_museum SET animal_type = ?, animal_weight = ?, is_alive = ?
//       WHERE id = ?
//     `;
//   connection.query(
//     sql,
//     [req.body.type, req.body.weight, req.body.isAlive, req.params.id],
//     function (error, results, fields) {
//       if (error) throw error;
//       console.log(req.body);
//       res.json({ message: "OK" });
//     }
//   );
// });

export default router;
