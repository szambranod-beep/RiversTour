const { readFile } = require("../utils/fileDb");

const FILE_NAME = "users.json";

const getAll = async () => {
return await readFile(FILE_NAME);
};

const getByEmail = async (email) => {
const users = await getAll();
return users.find((user) => user.email === email);
};

const getById = async (id) => {
const users = await getAll();
return users.find((user) => user.id === id);
};

module.exports = {
getAll,
getByEmail,
getById
};

