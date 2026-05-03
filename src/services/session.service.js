const sessionRepository = require("../repositories/session.repository");

const getSession = async (token) => {
const session = await sessionRepository.getByToken(token);

if (!session) {
throw new Error("Sesión inválida");
}

return session;
};

const logout = async (token) => {
return await sessionRepository.deleteByToken(token);
};

module.exports = {
getSession,
logout
};
