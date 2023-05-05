const db = require("../utils/connection.js");
const response = require("../utils/response.js");

const commentController = {
  insertOne: (req, resp) => {
    try {
      const { name, email, message } = req.body
      
      if(!email || !name || !message) return response(400, null, "Invalid input", resp)
      const sql = `INSERT INTO comments VALUES('${name}', '${email}', '${message}', NULL, DEFAULT)`
  
      db.query(sql, (err, res) => {
        if(err) throw err
        if (res.affectedRows) {
          const data = { isSuccess: res.affectedRows, id: res.insertId };
          response(201, data, "sucess, post a comment", resp);
        }
      })
    } catch (err) {
      console.log(err);
    }
  },
  findAll: (req, resp) => {
    try {
      const sql = `SELECT * FROM comments`
      db.query(sql, (err, res) => {
        if(err) throw err
        response(200, res, "sucess, get comments", resp)
      })
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = commentController