const validationSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

module.exports = validationSchema;
// validation middle ware
