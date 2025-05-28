// Update your isAuthenticated middleware
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // Return JSON for API routes, redirect for pages
  if (req.accepts('html')) {
    return res.redirect('/login');
  }
  return res.status(401).json({ message: 'Unauthorized' });
};