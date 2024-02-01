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
      `insert into ${this.table} (title, picture, content, summary, category_id, country_id) values (?, ?, ?, ?, ?, ?)`,
      [
        article.title,
        article.picture,
        article.summary,
        article.content,
        article.category_id,
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
      `SELECT article.title, article.picture, DATE_FORMAT(article.publish_date, "%d-%m-%Y") as publish_date, article.id, article.summary, article.content, category_id, country_id, country.name as country_name, category.label as category_label FROM ${this.table} 
      LEFT JOIN country ON country.id = ${this.table}.country_id
      INNER JOIN category ON category.id = ${this.table}.category_id 
      WHERE ${this.table}.id = ?`,
      [id]
    );
    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readLatest(category) {
    const [rows] = await this.database.query(
      `SELECT article.title, article.picture, DATE_FORMAT(article.publish_date, "%d-%m-%Y") as publish_date, article.id, article.summary, category_id, country_id, country.name as country_name, category.label as category_label 
       FROM ${this.table}
       LEFT JOIN country ON country.id = ${this.table}.country_id
       INNER JOIN category ON category.id = ${this.table}.category_id 
       WHERE category.label = ? AND article.publish_date = (
         SELECT MAX(article.publish_date) 
         FROM ${this.table} 
         INNER JOIN category ON category.id = ${this.table}.category_id 
         WHERE category.label = ?
       )`,
      [category, category]
    );

    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `SELECT article.title, article.picture, DATE_FORMAT(article.publish_date, "%d-%m-%Y") as publish_date, article.id, article.summary, country.name as country_name, category.label as category_label FROM ${this.table} 
      LEFT JOIN country ON country.id = ${this.table}.country_id
      INNER JOIN category ON category.id = ${this.table}.category_id
      ORDER BY publish_date DESC`
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
