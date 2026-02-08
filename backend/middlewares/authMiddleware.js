const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const verifyToken = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = {
        user_id: decoded.user_id,
        role: decoded.role,
      };

      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden - You do not have access to this resource.' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  };
};

module.exports = { verifyToken };
