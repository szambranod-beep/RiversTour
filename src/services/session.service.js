let sessions = [];

const getAll = async () => {
return sessions;
};

const getByToken = async (token) => {
return sessions.find(s => s.token === token);
};

const create = async (session) => {
sessions.push(session);
return session;
};

const remove = async (token) => {
sessions = sessions.filter(s => s.token !== token);
};

module.exports = {
getAll,
getByToken,
create,
remove
};
