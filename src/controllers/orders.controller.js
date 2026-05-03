const ordersService = require("../services/orders.service");

const create = async (req, res, next) => {
try {
const token = req.headers["x-session-token"];
const user = req.user;


const { tours } = req.body;

const order = await ordersService.createOrder(
  user.userId,
  tours
);

res.status(201).json(order);


} catch (error) {
next(error);
}
};

const getMyOrders = async (req, res, next) => {
try {
const user = req.user;


const orders = await ordersService.getMyOrders(user.userId);

res.json(orders);


} catch (error) {
next(error);
}
};

module.exports = {
create,
getMyOrders
};

