const jwt = require("jsonwebtoken");

const isAuthenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Authentication header missing" });
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decode._id;
    next();
  } catch (err) {
    console.log("Internal Server Error at Authentication");
    res
      .status(401)
      .json({ message: "Authentication Error", error: err.message });
  }
};

module.exports = { isAuthenticate };
