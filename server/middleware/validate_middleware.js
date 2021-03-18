const Ajv = require('ajv');

module.exports = schema => (req, res, next) => {
  let validator = new Ajv.default({ allErrors: true });
  const fn_validate = validator.compile(schema);
  const is_valid = fn_validate(req.body);
  if (!is_valid) {
    return res.status(400).json(fn_validate.errors);
  }

  next();
}
