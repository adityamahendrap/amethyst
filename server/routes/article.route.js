const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/article.controller");

router.get("/", articlesController.findAll);
router.post("/", articlesController.insertOne);
router.get("/newest/:length", articlesController.findNewest);
router.get("/:id", articlesController.findOne);
router.put("/:id", articlesController.updateOne);
router.delete("/:id", articlesController.deleteOne);

module.exports = router;