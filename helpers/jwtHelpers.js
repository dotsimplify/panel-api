const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const {
  getSingleValueByKey,
  setValueWithExpiration,
} = require("../helpers/redisFunctions");

module.exports = {
  // create accessToken
  createAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = { id: userId };
      const options = {
        expiresIn: "1h",
      };
      JWT.sign(
        payload,
        process.env.ADMIN_ACCESS_TOKEN,
        options,
        (err, token) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }
          resolve(token);
        }
      );
    });
  },
  createRefreshToken: async (userId) => {
    return new Promise(async (resolve, reject) => {
      const payload = {};
      const options = {
        expiresIn: "30d",
        audience: userId,
      };
      JWT.sign(
        payload,
        process.env.ADMIN_REFRESH_TOKEN,
        options,
        async (err, token) => {
          if (err) {
            console.log(err.message);
            // reject(err)
            reject(createError.InternalServerError());
          }
          setValueWithExpiration(userId, 30 * 24 * 60 * 60 * 1000, token);

          resolve(token);
        }
      );
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise(async (resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.ADMIN_REFRESH_TOKEN,
        async (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userId = payload.aud;

          let result = await getSingleValueByKey(userId);

          if (refreshToken === result) return resolve(userId);
          reject(createError.Unauthorized());
        }
      );
    });
  },
};
