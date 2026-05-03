const { readFile, writeFile } = require("../utils/fileDb");

const FILE_NAME = "sessions.json";

const getAll = async () => {
return await readFile(FILE_NAME);
};

const getByToken = async (token) => {
const sessions = await getAll();
return sessions.find((session) => session.token === token);
};

const create = async (session) => {
const sessions = await getAll();
sessions.push(session);

await writeFile(FILE_NAME, sessions);
return session;
};

const deleteByToken = async (token) => {
const sessions = await getAll();

const filtered = sessions.filter(
(session) => session.token !== token
);

await writeFile(FILE_NAME, filtered);
return true;
};

module.exports = {
getAll,
getByToken,
create,
deleteByToken
};
