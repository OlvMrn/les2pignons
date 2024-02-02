// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all countries from the database
    const countries = await tables.country.readAll();

    // Respond with the countries in JSON format
    res.json(countries);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch a specific categorie from the database based on the provided ID
    const country = await tables.country.read(req.params.id);

    // If the categorie is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the categorie in JSON format
    if (country == null) {
      res.sendStatus(404);
    } else {
      res.json(country);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
};
