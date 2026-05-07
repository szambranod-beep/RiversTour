const authService = require("../services/auth.service");
const sessionsService = require("../services/sessions.service");

const login = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json(result);

  } catch (error) {
    next(error);
  }

};

const logout = async (req, res, next) => {

  try {

    const token = req.headers["x-session-token"];

    await sessionsService.logout(token);

    res.json({
      message: "Logout exitoso"
    });

  } catch (error) {
    next(error);
  }

};

module.exports = {
  login,
  logout
};
