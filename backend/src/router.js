const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const articleControllers = require("./controllers/articleControllers");

// Route to get a list of items
router.get("/articles", articleControllers.getArticles);

// Route to get a specific item by ID
router.get("/articles/:id", articleControllers.getArticlesById);

// Route to add a new item
/* router.post("/items", itemControllers.add); */

/* ************************************************************************* */

module.exports = router;
