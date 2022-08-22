const yup = require("yup");

const validator = {
  leadSchema: yup.object({
    name: yup
      .string()
      .required("Name can't be blank")
      .min(3, "Minumum 3 Digits"),
    email: yup.string().email().required("lead answer can't be blank"),
  }),
};

module.exports = validator;
