const Joi = require("joi");

module.exports = function (req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().required(),
    rating: Joi.number().required(),
    numReviews: Joi.number().required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.redirect("back");
  }

  next();
};
