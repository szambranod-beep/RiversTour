const sessionRepository = require("../repositories/session.repository");

const getByToken = async (token) => {
  return await sessionRepository.getByToken(token);
};

const logout = async (token) => {
  return await sessionRepository.remove(token);
};

module.exports = {
  getByToken,
  logout
};