const adminModel = require("../../models/adminModel");

const adminAuthentication = async (req, res, next) => {
  try {
    const user = await adminModel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(400).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = adminAuthentication;
