function authMiddleware(req, res, next) {
  if (!req.session.userLogged) {
    return res.redirect('/users/login'); // si NO está logueado, lo manda al login
  }
  next(); // si está logueado, permite el acceso
}

module.exports = authMiddleware;