const db = require("../utils/connection.js");
const response = require("../utils/response.js");

const adminController = {
  checkData: (req, resp) => {
    try {
      const sql = `SELECT * FROM admin WHERE username = '${req.query.username}' && password = '${req.query.password}'`;

      db.query(sql, (err, res) => {
        if (err) throw err;
        response(200, res, "OK", resp);
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = adminController;
