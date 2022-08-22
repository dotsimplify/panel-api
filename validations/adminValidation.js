const yup = require("yup");

const adminValid = {
  registerAdminValidation: yup.object({
    name: yup.string().required("Name can't be blank").min(3).max(30),
    email: yup.string().email().required(),
    profilePic: yup.object(),
    username: yup
      .string()
      .required("username can't be blank")
      .max(15, "Maximum 15 charactors")
      .min("3", "Minimum 3 chararctors"),
    password: yup
      .string()
      .required("Pasword can't be blank")
      .min(5, "Password must be minimum 5 characters")
      .max(20),
  }),
  loginAdminValidation: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required("Pasword can't be blank"),
  }),
};
module.exports = adminValid;
