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

const validateArticle = require("./validators/validateArticle");
const validateUser = require("./validators/validateUser");
const checkCredentials = require("./middlewares/checkCredentials");

// Route to get a list of items
router.get("/articles", articleControllers.browse);
router.get("/countries", countryControllers.browse);
router.get("/users", userControllers.browse);
router.get("/users/profile", checkCredentials, userControllers.getProfile);
router.get("/categories", categoryControllers.browse);

// Route to get a specific item by ID
router.get("/articles/:id", articleControllers.read);
router.get("/articles/latest/:category", articleControllers.readLatest);

// Route to add a new item
router.post("/articles", validateArticle, articleControllers.add);
router.post("/register", validateUser, userControllers.add);
router.post("/login", validateUser, userControllers.login);

// Route to edit an new item
router.put("/articles/:id", validateArticle, articleControllers.edit);

// Route to remove an item
router.delete("/articles/:id", articleControllers.destroy);

/* ************************************************************************* */

module.exports = router;
