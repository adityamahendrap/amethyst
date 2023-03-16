const db = require("../database/connection.js");
const validUrl = require('valid-url');
const response = require("../response.js");

const userController = {
  getAllData: (req, resp) => {
    const sql = `SELECT * FROM articles`;
    
    db.query(sql, (err, res) => {
      if (err) throw err;
      response(200, res, "GET all data", resp);
    });
  },
  getDataById: (req, resp) => {
    const sql = `SELECT * FROM articles WHERE id = '${req.params.id}'`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      if(res.length == 0) return response(404, res, "Article not found", resp);
      response(200, res, "GET data by id", resp);
    });
  },
  postData: (req, resp) => {
    try {
      const { title, tag, image:imageLink, description, paragraph, createdAt, lastUpdated } =
        req.body;
      
      if(!title || !tag || !imageLink || !description || !paragraph) return response(400, null, "You must fill all input!", resp)
      if(!validUrl.isWebUri(imageLink)) return response(400, null, 'Image should be a valid link', resp)
      const unixTimestamp = Date.now();
      const sql = `INSERT INTO articles VALUES (NULL,'${title.toUpperCase()}','${tag.toUpperCase()}', '${imageLink}','${description}','${paragraph}','${unixTimestamp}', NULL)`;
  
      db.query(sql, (err, res) => {
        if (err) throw err;
        if (res.affectedRows) {
          const data = {
            isSuccess: res.affectedRows,
            id: res.insertId,
          };
          response(201, data, "POST article", resp);
        }
      });
    } catch(err) {
      console.log(err);
      return response(500, null, "Server error", resp)
    }
  },
  updateData: (req, resp) => {
    try {
      const { title, tag, image:imageLink, description, paragraph, createdAt, lastUpdated } =
        req.body;
      
      if(!title || !tag || !imageLink || !description || !paragraph) return response(400, null, "You must fill all input!", resp)
      if(!validUrl.isWebUri(imageLink)) return response(400, null, 'Image should be a valid link', resp)
      const unixTimestamp = Date.now();
      const sql = `UPDATE articles SET id=${req.params.id}, title='${title.toUpperCase()}', tag='${tag.toUpperCase()}', image='${imageLink}', description='${description}', paragraph= '${paragraph}', lastUpdated='${unixTimestamp}' WHERE id = ${req.params.id}`;
  
      db.query(sql, (err, res) => {
        if (err) throw err;
        if (res.affectedRows) {
          const data = {
            isUpdated: res.affectedRows,
            message: res.message,
          };
          return response(201, data, "PUT article", resp);
        } 
        response(404, { isUpdated: res.affectedRows }, "not found, cannot PUT article", resp);
      });
    } catch(err) {
      console.log(err);
      return response(500, null, 'Server error', resp)
    }
  },
  deleteData: (req, resp) => {
    const sql = `DELETE FROM articles WHERE id= '${req.params.id}'`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      if (res.affectedRows) {
        return response(201, { isDeleted: res.affectedRows }, "DELETE article", resp);
      } 
      response(404, { isDeleted: res.affectedRows }, "not found, cannot DELETE article", resp);
    });
  },
};

module.exports = userController;
