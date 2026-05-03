const userRepository = require("../repositories/user.repository");
const sessionRepository = require("../repositories/session.repository");

const login = async (email, password) => {
const user = await userRepository.getByEmail(email);

if (!user || user.password !== password) {
throw new Error("Credenciales inválidas");
}

// generar token simple
const token = Date.now().toString();

const session = {
token,
userId: user.id,
role: user.role,
createdAt: new Date()
};

await sessionRepository.create(session);

return {
message: "Login exitoso",
token,
user: {
id: user.id,
name: user.name,
role: user.role
}
};
};

module.exports = {
login
};
