const client = require("../../database/client");

const getArticles = (req, res) => {
  client
    .query("SELECT * FROM article")
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getArticlesById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  client
    .query("SELECT * FROM article WHERE id = ?", [id])
    .then((result) => {
      if (result[0] != null) {
        res.status(200).json(result[0][0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getArticles,
  getArticlesById,
};
