const AbstractManager = require("./AbstractManager");

class CountryManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "country" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the first row of the result, which represents the item
    return rows;
  }
}

module.exports = CountryManager;
