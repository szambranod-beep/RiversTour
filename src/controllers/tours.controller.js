const toursService = require("../services/tours.service");

const getAll = async (req, res, next) => {
try {
const tours = await toursService.getAll();
res.json(tours);
} catch (error) {
next(error);
}
};

const getById = async (req, res, next) => {
try {
const id = Number(req.params.id);


const tour = await toursService.getById(id);

res.json(tour);


} catch (error) {
next(error);
}
};

const create = async (req, res, next) => {
try {
const newTour = await toursService.create(req.body);


res.status(201).json(newTour);


} catch (error) {
next(error);
}
};

const update = async (req, res, next) => {
try {
const id = Number(req.params.id);


const updated = await toursService.update(id, req.body);

res.json(updated);


} catch (error) {
next(error);
}
};

const remove = async (req, res, next) => {
try {
const id = Number(req.params.id);


await toursService.remove(id);

res.json({ message: "Tour eliminado" });


} catch (error) {
next(error);
}
};

module.exports = {
getAll,
getById,
create,
update,
remove
};

