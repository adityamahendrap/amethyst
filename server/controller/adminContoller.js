const db = require("../database/connection.js");
const response = require("../response.js");

const adminController = {
  getAllData: (req, resp) => {
    const sql = `SELECT * FROM admin`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      response(200, res, "GET all data", resp);
    });
  },
  checkData: (req, resp) => {
    const sql = `SELECT * FROM admin WHERE username = '${req.query.username}' && password = '${req.query.password}'`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      response(200, res, "OK", resp);
    });
  },
};

module.exports = adminController;
