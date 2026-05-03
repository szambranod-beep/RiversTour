const orderRepository = require("../repositories/orders.repository");
const tourRepository = require("../repositories/tours.repository");

const createOrder = async (userId, tourIds) => {
if (!tourIds || tourIds.length === 0) {
throw new Error("Debe seleccionar al menos un tour");
}

const tours = await tourRepository.getAll();

const selectedTours = tours.filter((t) =>
tourIds.includes(t.id)
);

if (selectedTours.length === 0) {
throw new Error("Tours inválidos");
}

const total = selectedTours.reduce(
(sum, t) => sum + t.price,
0
);

const order = {
id: Date.now(),
userId,
tours: tourIds,
total,
status: "confirmed",
date: new Date()
};

return await orderRepository.save(order);
};

const getMyOrders = async (userId) => {
return await orderRepository.getByUserId(userId);
};

module.exports = {
createOrder,
getMyOrders
};

