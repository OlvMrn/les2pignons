const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const articleControllers = require("./controllers/articleControllers");
const countryControllers = require("./controllers/countryControllers");
const userControllers = require("./controllers/userControllers");
const categoryControllers = require("./controllers/categoryControllers");

// Route to get a list of items
router.get("/articles", articleControllers.browse);
router.get("/countries", countryControllers.browse);
router.get("/users", userControllers.browse);
router.get("/categories", categoryControllers.browse);

// Route to get a specific item by ID
router.get("/articles/:id", articleControllers.read);

// Route to add a new item
router.post("/articles", articleControllers.add);
router.post("/users", userControllers.add);

// Route to edit an new item
router.put("/articles/:id", articleControllers.edit);

// Route to remove an item
router.delete("/articles/:id", articleControllers.destroy);

/* ************************************************************************* */

module.exports = router;
