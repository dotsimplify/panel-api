const jwt = require("jsonwebtoken");

const adminTokenAuth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ message: "Invalid Credentials !!" });
    }
    jwt.verify(token, `${process.env.ADMIN_ACCESS_TOKEN}`, (err, user) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res
            .status(401)
            .json({ message: "Invalid  Credentials !! json" });
        } else {
          return res.status(403).json({ message: "Invalid  Credentials !!" });
        }
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = adminTokenAuth;
