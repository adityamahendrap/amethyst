const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const response = require("./response.js");
const articlesController = require("./controller/articlesController.js");
const adminContoller = require("./controller/adminContoller.js");
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, resp) => {
  response(200, { routeList: ["/admin", "/articles", "/articles/:id"] }, "API for AMETHYST blog/article management", resp);
});

app.route("/admin")
  .get(adminContoller.checkData)

app.route("/articles")
  .get(articlesController.getAllData)
  .post(articlesController.postData)
  
app.route("/articles/:id")
  .get(articlesController.getDataById)
  .put(articlesController.updateData)
  .delete(articlesController.deleteData)

app.listen(port, () => {
  console.log('Server running on port', port);
});