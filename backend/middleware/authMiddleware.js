const isAuth = (req, res, next) => {
  if (!req.session.user) 
    return res.status(401).json({ error: 'Please login first!' });
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.user) 
    return res.status(401).json({ error: 'Please login first!' });
  if (req.session.user.role !== 'admin') 
    return res.status(403).json({ error: 'Admins only!' });
  next();
};

module.exports = { isAuth, isAdmin };