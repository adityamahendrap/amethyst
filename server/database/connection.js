const mysql = require("mysql");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "",
  database: "amethyst",
});

db.connect((error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("MySQL Connected...");
});

module.exports = db;
