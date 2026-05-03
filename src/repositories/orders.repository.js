const { readFile, writeFile } = require("../utils/fileDb");

const FILE_NAME = "orders.json";

const getAll = async () => {
return await readFile(FILE_NAME);
};

const getByUserId = async (userId) => {
const orders = await getAll();
return orders.filter((order) => order.userId === userId);
};

const save = async (newOrder) => {
const orders = await getAll();
orders.push(newOrder);

await writeFile(FILE_NAME, orders);
return newOrder;
};

module.exports = {
getAll,
getByUserId,
save
};

