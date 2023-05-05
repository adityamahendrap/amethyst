const db = require("../utils/connection.js");
const response = require("../utils/response.js");

const userController = {
  findAll: (req, resp) => {
    try {
      const sql = `SELECT * FROM articles`;

      db.query(sql, (err, res) => {
        if (err) throw err;
        response(200, res, "sucess, get all data", resp);
      });
    } catch (error) {
      console.log(error);
      response(500, null, "Server error", resp);
    }
  },
  findOne: (req, resp) => {
    try {
      const sql = `SELECT * FROM articles WHERE id = '${req.params.id}'`;

      db.query(sql, (err, res) => {
        if (err) throw err;
        if (res.length == 0)
          return response(404, res, "Article not found", resp);
        response(200, res, "sucess, get data by id", resp);
      });
    } catch (error) {
      console.log(error);
      response(500, null, "Server error", resp);
    }
  },
  findNewest: (req, resp) => {
    try {
      const { length } = req.params;
      const sql = `SELECT * FROM articles ORDER BY createdAt DESC LIMIT ${length}`;

      db.query(sql, (err, res) => {
        if (err) throw err;
        response(200, res, `succes, get ${length} newest data`, resp);
      });
    } catch (error) {
      console.log(error);
      response(500, null, "Server error", resp);
    }
  },
  insertOne: (req, resp) => {
    try {
      const {
        title,
        tag,
        image,
        description,
        paragraph,
      } = req.body;
      
      if (!title || !tag  || !description || !paragraph)
        return response(400, null, "You must fill all input!", resp);

      const slug = title.toLowerCase().split(' ').join('-')
      const timestamp = Date.now();
      const sql = `INSERT INTO articles VALUES (NULL,'${title.toUpperCase()}', '${slug}','${tag.toLowerCase()}', '${image}','${description}','${paragraph}','${timestamp}', NULL)`;

      db.query(sql, (err, res) => {
        if (err) throw err;
        if (res.affectedRows) {
          const data = { isSuccess: res.affectedRows, id: res.insertId };
          response(201, data, "sucess, post an article", resp);
        }
      });
    } catch (err) {
      console.log(err);
      resp.sendStatus(500)
    }
  },
  updateOne: (req, resp) => {
    try {
      const {
        title,
        tag,
        image,
        description,
        paragraph,
      } = req.body;

      if (!title || !tag || !description || !paragraph)
        return response(400, null, "You must fill all input!", resp);
      
      const slug = title.toLowerCase().split(' ').join('-')
      const timestamp = Date.now();
      const sql = `UPDATE articles SET id=${req.params.id}, title='${title.toUpperCase()}', slug='${slug}', tag='${tag.toLowerCase()}', image='${image}', description='${description}', paragraph= '${paragraph}', lastUpdated='${timestamp}' WHERE id = ${req.params.id}`;

      db.query(sql, (err, res) => {
        if (err) throw err;
        if (res.affectedRows) {
          const data = {
            isUpdated: res.affectedRows,
            message: res.message,
          };
          return response(201, data, "sucess, update an article", resp);
        }
        response(404, { isUpdated: res.affectedRows }, "not found, cannot update an article", resp);
      });
    } catch (err) {
      console.log(err);
      response(500, null, "Server error", resp);
    }
  },
  deleteOne: (req, resp) => {
    try {
      const sql = `DELETE FROM articles WHERE id= '${req.params.id}'`;

      db.query(sql, (err, res) => {
        if (err) throw err;
        if (res.affectedRows) {
          return response(201, { isDeleted: res.affectedRows }, "sucess delete an article", resp);
        }
        response(404, { isDeleted: res.affectedRows }, "not found, cannot delete an article", resp);
      });
    } catch (error) {
      console.log(error);
      response(500, null, "Server error", resp);
    }
  },
};

module.exports = userController;
