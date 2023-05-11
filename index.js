const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0919100413",
  database: "crudgame",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { description } = req.body;
  const { timeReady } = req.body;

  let mysql = "INSERT INTO demands ( description, timeReady ) VALUES (?, ?)";
  db.query(mysql, [description, timeReady], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { description } = req.body;
  const { timeReady } = req.body;

  let mysql =
    "SELECT * from demands WHERE description = ? AND timeReady = ?";
  db.query(mysql, [description, timeReady], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM demands order by timeReady";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { description } = req.body;
  const { timeReady } = req.body;
  let mysql = "UPDATE demands SET description = ?, timeReady = ? WHERE id = ?";
  db.query(mysql, [description, timeReady, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM demands WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
