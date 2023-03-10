const db = require("../model/connection.js");
const response = require("../response.js");

const adminController = {
  getAllData: (req, resp) => {
    const sql = `SELECT * FROM admin`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      response(200, res, "GET all data", resp);
    });
  },
}

module.exports = adminController