CREATE TABLE country (
 id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
 name VARCHAR(100) NOT NULL
);

CREATE TABLE category (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(100) NOT NULL
);

CREATE TABLE article (
 id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
 title VARCHAR(255) NOT NULL,
 picture VARCHAR(255) NOT NULL,
 content TEXT NOT NULL,
 publish_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 category_id INT UNSIGNED NOT NULL,
 country_id INT UNSIGNED,
 FOREIGN KEY (country_id) REFERENCES country(id) ON DELETE CASCADE,
 FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE role (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(50) NOT NULL
);

CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
)

