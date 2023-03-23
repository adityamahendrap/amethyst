const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const response = require("./utils/response");
const adminRoute = require('./routes/adminRoute');
const articlesRoute = require('./routes/articlesRoute');
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, resp) => {
  response(200, { routeList: ["/admin", "/articles", "/articles/:id"] }, "API for AMETHYST blog/article management", resp);
});

app.use('/admin', adminRoute)
app.use('/articles', articlesRoute)

app.listen(port, () => {
  console.log("Server running on port", port);
});
