const jwt = require("jsonwebtoken");
module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; //Bearer f32fg21sdadg3hhfdsf
      if (!token) {
        return res.status(401).json({ message: "Not authorized" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Not allowed" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized" });
    }
  };
};
