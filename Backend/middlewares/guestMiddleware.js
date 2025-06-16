function guestMiddleware(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect('/users/profile'); // si está logueado, redirige al perfil
  }
  next(); // si no está logueado, permite el acceso
}

module.exports = guestMiddleware;