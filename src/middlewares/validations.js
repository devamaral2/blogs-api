module.exports = (schemas) => (req, _res, next) => {
  const { error } = schemas.validate(req.body);
  if (!error) return next();
  return next({ status: 400, message: error.details[0].message });
};
