/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");
const user = require("./database/data/user.json");
const role = require("./database/data/role.json");
const country = require("./database/data/country.json");
const article = require("./database/data/article.json");
const category = require("./database/data/category.json");

const seed = async () => {
  try {
    const roleQuery = [];
    for (let i = 0; i < role.length; i += 1) {
      roleQuery.push(
        database.query("insert into role(label) values (?)", [role[i].label])
      );
    }
    await Promise.all(roleQuery);

    const userQuery = [];
    for (let i = 0; i < user.length; i += 1) {
      userQuery.push(
        database.query(
          "insert into user(email, password, role_id) values (?, ?, ?)",
          [user[i].email, user[i].password, user[i].role_id]
        )
      );
    }
    await Promise.all(userQuery);

    const countryQuery = [];
    for (let i = 0; i < country.length; i += 1) {
      countryQuery.push(
        database.query("insert into country(name) values (?)", [
          country[i].name,
        ])
      );
    }
    await Promise.all(countryQuery);

    const categoryQuery = [];
    for (let i = 0; i < role.length; i += 1) {
      categoryQuery.push(
        database.query("insert into category(label) values (?)", [
          category[i].label,
        ])
      );
    }
    await Promise.all(categoryQuery);

    const articleQuery = [];
    for (let i = 0; i < article.length; i += 1) {
      articleQuery.push(
        database.query(
          "insert into article(title, picture, content, publish_date, category_id, country_id) values (?, ?, ?, ?, ?, ?)",
          [
            article[i].title,
            article[i].picture,
            article[i].content,
            article[i].publish_date,
            article[i].category_id,
            article[i].country_id,
          ]
        )
      );
    }
    await Promise.all(articleQuery);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
