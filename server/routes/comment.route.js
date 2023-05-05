const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");

router.get("/", commentController.findAll);
router.post("/", commentController.insertOne);

module.exports = router;
