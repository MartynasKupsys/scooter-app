import express from "express";
import cors from "cors";
import router from "./routers/routers.js";

const app = express();

const port = 5000;

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "james_bond",
// });

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.use(cors());
app.use("/", router);
// app.use("/grybai/", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
