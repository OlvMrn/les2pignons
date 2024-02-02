const { hash, verify } = require("../services/hashPw");
const { createToken } = require("../services/jwt");

// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.user.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.readByEmail(req.body.email);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(403);
    } else {
      const check = await verify(req.body.password, user.password);
      if (check) {
        delete user.password;
        res
          .cookie("auth", createToken(user), { httpOnly: true })
          .status(200)
          .json({ id: user.id, email: user.email, roleId: user.role_id });
      } else {
        res.sendStatus(403);
      }
    }
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const profile = await tables.user.readProfile(req.user.id);
    res
      .cookie("auth", createToken(profile), { httpOnly: true })
      .status(200)
      .json(profile);
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body

  try {
    const hashPassword = await hash(req.body.password);
    await tables.user.create(req.body.email, hashPassword);
    // Insert the user into the database
    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json("OK");
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  login,
  getProfile,
  // edit,
  add,
  // destroy,
};
