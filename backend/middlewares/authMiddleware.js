const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //bearer token
  if (token == null) {
    return res.status(401); // unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403); // forbidden
    }
    req.user = user;
    next();
  });
};

module.exports = authenticationMiddleware;
