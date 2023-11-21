const jwt = require('jsonwebtoken');

const secretKey = 'CHIRAG57'; 
function authenticateUser(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    req.user = {
      userId: decoded.userId, 
    };

    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token. Access denied.' });
  }
}

module.exports = authenticateUser;
