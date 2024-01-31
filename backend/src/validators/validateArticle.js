const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().required(),
  picture: Joi.string().required(),
  content: Joi.string().required(),
  category_id: Joi.number().required(),
  country_id: Joi.number(),
});

const validateArticle = (req, res, next) => {
  delete req.body.id;
  delete req.body.publish_date;
  delete req.body.country_name;
  delete req.body.category_label;

  if (!req.body.country_id) {
    delete req.body.country_id;
  }

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = validateArticle;
