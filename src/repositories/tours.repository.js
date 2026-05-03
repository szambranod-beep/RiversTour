const { readFile, writeFile } = require("../utils/fileDb");

const FILE_NAME = "tours.json";

const getAll = async () => {
return await readFile(FILE_NAME);
};

const getById = async (id) => {
const tours = await getAll();
return tours.find((tour) => tour.id === id);
};

const save = async (newTour) => {
const tours = await getAll();
tours.push(newTour);

await writeFile(FILE_NAME, tours);
return newTour;
};

const update = async (id, data) => {
const tours = await getAll();

const index = tours.findIndex((tour) => tour.id === id);
if (index === -1) return null;

tours[index] = { ...tours[index], ...data };

await writeFile(FILE_NAME, tours);
return tours[index];
};

const remove = async (id) => {
const tours = await getAll();

const filtered = tours.filter((tour) => tour.id !== id);

await writeFile(FILE_NAME, filtered);
return true;
};

module.exports = {
getAll,
getById,
save,
update,
remove
};

