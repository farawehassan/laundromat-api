const jwt = require('jsonwebtoken');

/// Make sure you cross check this and set it up to your style and how you use JWT
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.send({status: 401, error: "true", message: "Not authenticated" });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
  } catch (error) {
    return res.send({status: 422, error: "true", message: "Invalid authorization header" });
  }
  if (!decodedToken) {
    return res.send({status: 401, error: "true", message: "Not authenticated" });
  }
  req.userId = decodedToken.userId;
  req.userEmail = decodedToken.email;
  next();
};
