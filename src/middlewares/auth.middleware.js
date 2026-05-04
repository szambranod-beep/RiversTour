const sessionsService = require("../services/sessions.service");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-session-token"];

    if (!token) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const session = await sessionsService.getByToken(token);

    if (!session) {
      return res.status(401).json({ message: "Sesión inválida" });
    }

    req.user = session;
    next();

  } catch (error) {
    next(error); 
  }
};