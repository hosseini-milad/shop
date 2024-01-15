const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({error:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({error:"Invalid Token Error"});
  }
  return next();
};

module.exports = verifyToken;