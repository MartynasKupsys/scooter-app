import express from "express";
import mysql from "mysql";
const router = express.Router();

const connection = mysql.createConnection({
  host: "192.168.88.39",
  user: "root",
  password: "-EV8Drejas!89",
  database: "james_bond",
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

// GET ALL RECORDS
// router.get("/grybai", (req, res) => {
//   const sql = `SELECT * FROM grybu_karas`;
//   connection.query(sql, function (error, result, fields) {
//     try {
//       // console.log(result);
//       if (error) throw error.code;
//     } catch {
//       console.log(error.code);
//     }
//     res.json(result);
//   });
// });

// INSERT
// With prepared statement
router.post("/grybai", (req, res) => {
  console.log(req.body);
  if (req.body.title === "") {
    req.body.title = "";
  }
  if (req.body.power === "") {
    req.body.power = 0;
  }
  const sql = `
      INSERT INTO grybu_karas (title, type, power)
      VALUES (?, ?, ?)  
    `;
  connection.query(
    sql,
    [req.body.title, req.body.type, req.body.power],
    function (error, results, fields) {
      if (error) throw error;
      console.log(req.body);
      res.json({ message: "OK" });
    }
  );
});

// NOT prepared statement
// app.post("/trees", (req, res) => {
//   const sql = `
//     INSERT INTO trees (title, height, type)
//     VALUES ('${req.body.title}', ${req.body.height}, ${req.body.type})
//   `;
//   connection.query(sql, function (error, results, fields) {
//     if (error) throw error;
//   });
//   console.log(req.body);
//   res.json({ message: "OK" });
// });

// DELETE
router.delete("/grybai/:id", (req, res) => {
  const sql = `DELETE FROM grybu_karas WHERE id = ${req.params.id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json({ message: "OK" });
  });
});

// UPDATE BY ID NEED REFACTORING
router.put("/grybai/:id", (req, res) => {
  const sql = `
      UPDATE grybu_karas SET title = ?, type = ?, power = ?
      WHERE id = ?
    `;
  connection.query(
    sql,
    [req.body.title, req.body.type, req.body.power, req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      console.log(req.body);
      res.json({ message: "OK" });
    }
  );
});

// query pagal id param
router.get("/grybai/:id", (req, res) => {
  const sql = `
      SELECT * FROM grybu_karas  WHERE id = '${req.params.id}'`;
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

router.get("/grybai", (req, res) => {
  let sql;
  console.log("========================================================================");
  console.log(req.query);
  console.log(req.query.type);
  console.log(req.query.sort);
  // const { type, max_power, min_power, sort } = req.query;
  // const parametrai = [type, min_power, max_power];
  // console.log(type, min_power, max_power);
  // const parsedReq = JSON.parse(req.query);
  // console.log(parsedReq);
  const parametrai = [];
  const queryObj = {};
  const sqlTest = `SELECT * FROM grybu_karas`;
  const tipas = `type = ?`;
  const minGali = `power >= ?`;
  const maxGalia = `power <= ?`;

  for (const key of Object.keys(req.query)) {
    console.log(key, req.query[key]);
    if (req.query[key] != 0) {
      parametrai.push(req.query[key]);
      queryObj[key] = req.query[key];
    }
    // else if (key === "sort" && key.length !== 0) {
    //   parametrai.push(req.query[key]);
    //   queryObj[key] = req.query[key];
    // }
    // console.log(parseInt(req.query[key]));
  }
  parametrai.forEach((el) => {});
  console.log(parametrai);
  console.log(queryObj);

  sql = `SELECT * FROM grybu_karas WHERE type = ? AND power >= ? AND power <= ? ORDER BY power ${
    req.query.sort == "DESC" ? "DESC" : "ASC"
  }`;

  if (req.query.sort == "ASC" || req.query.sort == "DESC") {
    // sql = `SELECT * FROM grybu_karas ORDER BY power ${req.query.sort}`;
    sql = `SELECT * FROM grybu_karas ORDER BY power ${req.query.sort == "DESC" ? "DESC" : "ASC"}`;
    connection.query(sql, function (error, result) {
      try {
        // console.log(result);
        res.json(result);
        if (error) throw error.code;
      } catch {
        console.log(error.code);
      }
    });
  } else if (req.query.type == 0 && req.query.max_power == 0 && req.query.min_power != 0) {
    sql = `SELECT * FROM grybu_karas WHERE power > ?`;
    connection.query(sql, [req.query.min_power], function (error, result) {
      try {
        // console.log(result);
        res.json(result);
        if (error) throw error.code;
      } catch {
        console.log(error.code);
      }
    });
  } else if (req.query.type == 0 && req.query.max_power != 0 && req.query.min_power != 0) {
    sql = `SELECT * FROM grybu_karas WHERE power >= ? AND power <= ?`;
    connection.query(sql, [req.query.min_power, req.query.max_power], function (error, result) {
      try {
        // console.log(result);
        res.json(result);
        if (error) throw error.code;
      } catch {
        console.log(error.code);
      }
    });
  } else if (req.query.type != 0 && req.query.max_power != 0 && req.query.min_power != 0) {
    sql = `SELECT * FROM grybu_karas WHERE type = ? AND power >= ? AND power <= ?`;
    connection.query(
      sql,
      [req.query.type, req.query.min_power, req.query.max_power],
      function (error, result) {
        try {
          // console.log(result);
          res.json(result);
          if (error) throw error.code;
        } catch {
          console.log(error.code);
        }
      }
    );
  } else if (req.query.type != 0 && req.query.max_power == 0) {
    sql = `SELECT * FROM grybu_karas WHERE type = ?`;
    connection.query(sql, [req.query.type], function (error, result) {
      try {
        // console.log(result);
        res.json(result);
        if (error) throw error.code;
      } catch {
        console.log(error.code);
      }
    });
  } else if (req.query.max_power != 0 && req.query.type == 0) {
    sql = `SELECT * FROM grybu_karas WHERE power < ?`;
    connection.query(sql, [req.query.max_power], function (error, result) {
      try {
        // console.log(result);
        res.json(result);
        if (error) throw error.code;
      } catch {
        console.log(error.code);
      }
    });
  } else if (req.query.type == 0 && req.query.max_power == 0) {
    sql = `SELECT * FROM grybu_karas`;
    connection.query(sql, function (error, result) {
      try {
        // console.log(result);
        res.json(result);
        if (error) throw error.code;
      } catch {
        console.log(error.code);
      }
    });
  } else {
    sql = `
    SELECT * FROM grybu_karas  WHERE type = ? AND power < ?`;
    connection.query(sql, [req.query.type, req.query.max_power], function (error, result) {
      try {
        // console.log(result);
        res.json(result);
        if (error) throw error.code;
      } catch {
        console.log(error.code);
      }
    });
  }
  console.log(sql);
  // connection.query(sql, [req.query.type, req.query.power], function (error, result, fields) {
  //   // console.log(fields);
  //   try {
  //     console.log(result);
  //     if (error) throw error.code;
  //   } catch {
  //     console.log(error.code);
  //   }
  //   res.json(result);
  // });
});

router.get("/join/inner", (req, res) => {
  // INNER JOIN
  const sql = `SELECT grybu_karas.id, colors.id AS color_id, color, 
  grybu_karas.type AS grybo_tipas, 
  colors.type AS spalvos_tipas 
  FROM grybu_karas 
  INNER JOIN colors ON grybu_karas.id = colors.grybas_id`;
  connection.query(sql, function (error, result) {
    try {
      // console.log(result);
      res.json(result);
      if (error) throw error.code;
    } catch {
      console.log(error.code);
    }
  });
});

router.get("/join/left", (req, res) => {
  // LEFT JOIN
  const sql = `SELECT * FROM grybu_karas LEFT JOIN colors ON grybu_karas.id = colors.grybas_id`;
  connection.query(sql, function (error, result) {
    try {
      // console.log(result);
      res.json(result);
      if (error) throw error.code;
    } catch {
      console.log(error.code);
    }
  });
});

router.get("/join/right", (req, res) => {
  const sql = `SELECT * FROM grybu_karas RIGHT JOIN colors ON grybu_karas.id = colors.grybas_id`;
  connection.query(sql, function (error, result) {
    try {
      // console.log(result);
      res.json(result);
      if (error) throw error.code;
    } catch {
      console.log(error.code);
    }
  });
});

// ZOO MUSEUM

//CREATE
router.post("/zoo", (req, res) => {
  console.log(req.body);
  const sql = `
      INSERT INTO zoo_museum (animal_type, animal_weight, is_alive)
      VALUES (?, ?, ?)  
    `;
  connection.query(
    sql,
    [req.body.type, req.body.weight, req.body.isAlive],
    function (error, results, fields) {
      if (error) throw error;
      console.log(req.body);
      res.json({ message: "OK" });
    }
  );
});

// GET LIST
router.get("/zoo", (req, res) => {
  const sql = `
      SELECT id, animal_type AS type, animal_weight AS weight, is_alive AS isAlive FROM zoo_museum`;
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
// router.delete("/zoo/:id", (req, res) => {
//   const sql = `DELETE FROM zoo_museum WHERE id = ${req.params.id}`;
//   connection.query(sql, function (error, results, fields) {
//     if (error) throw error;
//     res.json({ message: "OK" });
//   });
// });

// SU PREPARE STATEMENT
router.delete("/zoo/:id", (req, res) => {
  const sql = `DELETE FROM zoo_museum WHERE id = ?`;
  connection.query(sql, [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json({ message: "OK" });
  });
});

// UPDATE BY ID
router.put("/zoo/:id", (req, res) => {
  const sql = `
      UPDATE zoo_museum SET animal_type = ?, animal_weight = ?, is_alive = ?
      WHERE id = ?
    `;
  connection.query(
    sql,
    [req.body.type, req.body.weight, req.body.isAlive, req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      console.log(req.body);
      res.json({ message: "OK" });
    }
  );
});

export default router;
