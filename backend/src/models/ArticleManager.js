const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "article" });
  }

  // The C of CRUD - Create operation

  async create(article) {
    // Execute the SQL INSERT query to add a new article to the "article" table
    const [result] = await this.database.query(
      `insert into ${this.table} (category, title, picture, content, publish_date, country_id) values (?, ?, ?, ?, ?, ?)`,
      [
        article.category,
        article.title,
        article.picture,
        article.content,
        article.publish_date,
        article.country_id,
      ]
    );

    // Return the ID of the newly inserted article
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select article.title, article.category, article.picture, article.publish_date, article.id, article.content, country.name from ${this.table} inner join country on country.id = ${this.table}.country_id where ${this.table}.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `select article.title, article.category, article.picture, article.publish_date, article.id, country.name from ${this.table} inner join country on country.id = ${this.table}.country_id`
    );

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ArticleManager;
