const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return res.status(401).json({
      loggedIn: false,
      message: "You are not authorized! Token missing.",
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "you are not authorized!",
    });
    return;
  }
};

module.exports = { authRequired };
