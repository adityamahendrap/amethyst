const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const response = require("./response.js");
const articlesController = require("./controller/articlesController.js");
const adminContoller = require("./controller/adminContoller.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const errorHandler = (err, req, resp, next) => {
  resp.json({err: err});
}

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

app.use(errorHandler);

app.listen(5000, () => {
  console.log(`server running on port 5000`);
});