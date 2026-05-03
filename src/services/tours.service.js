const tourRepository = require("../repositories/tours.repository");

const getAll = async () => {
return await tourRepository.getAll();
};

const getById = async (id) => {
const tour = await tourRepository.getById(id);

if (!tour) {
throw new Error("Tour no encontrado");
}

return tour;
};

const create = async (data) => {
const newTour = {
id: Date.now(),
title: data.title,
description: data.description,
price: data.price,
location: data.location,
duration: data.duration,
available: true,
image: data.image || null
};

return await tourRepository.save(newTour);
};

const update = async (id, data) => {
const updated = await tourRepository.update(id, data);

if (!updated) {
throw new Error("Tour no encontrado");
}

return updated;
};

const remove = async (id) => {
return await tourRepository.remove(id);
};

module.exports = {
getAll,
getById,
create,
update,
remove
};

