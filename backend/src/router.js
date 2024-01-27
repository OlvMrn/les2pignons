const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const articleControllers = require("./controllers/articleControllers");
const countryControllers = require("./controllers/countryControllers");
const userControllers = require("./controllers/userControllers");

// Route to get a list of items
router.get("/articles", articleControllers.browse);
router.get("/countries", countryControllers.browse);
router.get("/users", userControllers.browse);

// Route to get a specific item by ID
router.get("/articles/:id", articleControllers.read);

// Route to add a new item
router.post("/articles", articleControllers.add);
router.post("/users", userControllers.add);

/* ************************************************************************* */

module.exports = router;
