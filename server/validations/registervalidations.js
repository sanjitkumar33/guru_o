const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string().required(),
  mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
    .required(),
  confirmedpassword: Joi.valid(Joi.ref("password")).required(),
  com_name: Joi.string().required(),
});

module.exports = registerValidation;
