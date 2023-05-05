require("dotenv").config();
const express = require("express");
const cors = require("cors");
const response = require("./utils/response");
const adminRoute = require('./routes/admin.route');
const indexRoute = require('./routes/index.route');
const articlesRoute = require('./routes/article.route');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', indexRoute)
app.use('/api/admin', adminRoute)
app.use('/api/articles', articlesRoute)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
