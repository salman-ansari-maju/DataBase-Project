const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const secretKey = "ansari";
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userData = decoded;
    next();
  });
}
module.exports = verifyToken;
