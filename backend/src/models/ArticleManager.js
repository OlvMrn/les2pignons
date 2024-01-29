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
      `select article.title, article.category, article.picture, DATE_FORMAT(article.publish_date, "%Y-%m-%d") as publish_date, article.id, article.content, article.country_id, country.name as country_name from ${this.table} inner join country on country.id = ${this.table}.country_id where ${this.table}.id = ?`,
      [id]
    );
    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `select article.title, article.category, article.picture, DATE_FORMAT(article.publish_date, "%Y-%m-%d") as publish_date, article.id, country.name from ${this.table} inner join country on country.id = ${this.table}.country_id`
    );

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, article) {
    // Execute the SQL SELECT query to retrieve a specific article by its ID
    const [result] = await this.database.query(
      `UPDATE ${this.table} set ? WHERE id = ?`,
      [article, id]
    );

    // Return the first row of the result, which represents the item
    return result;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return result;
  }

  // async delete(id) {
  //   ...
  // }
}

module.exports = ArticleManager;
