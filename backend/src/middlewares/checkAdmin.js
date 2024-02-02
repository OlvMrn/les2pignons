const { verifyToken } = require("../services/jwt");

const checkCredentials = (req, res, next) => {
  const decode = verifyToken(req.cookies.auth);
  if (decode.role === 1) {
    req.user = decode;
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = checkCredentials;
