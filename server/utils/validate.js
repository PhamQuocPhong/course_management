const ajv = require('ajv');

module.exports = schema => (req, res, next) => {
  const validator = new ajv({ allErrors: true });
  const fn_validate = validator.compile(schema);
  const is_valid = fn_validate(req.body);
  if (!is_valid) {
    var error_messages = [];
    for(item of fn_validate.errors) error_messages.push(`[${item.dataPath}] ${item.message}`);
    return res.status(400).json(error_messages);
  }

  next();
}
