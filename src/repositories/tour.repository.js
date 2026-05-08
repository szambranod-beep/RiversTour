const path = require("path");
const crypto = require("crypto");
const { readJson, writeJson } = require("../utils/fileDb");

class TourRepository {
  constructor() {
    this.filePath = path.join(__dirname, "../../data/tours.json");
  }

  async list() {
    return await readJson(this.filePath);
  }

  async findById(id) {
    const tours = await this.list();
    return tours.find(tour => tour.id === id) || null;
  }

  async create(tour) {
    const tours = await this.list();

    const newTour = {
      id: crypto.randomUUID(),
      ...tour,
      active: true
    };

    tours.push(newTour);
    await writeJson(this.filePath, tours);

    return newTour;
  }

  async update(id, patch) {
    const tours = await this.list();
    const index = tours.findIndex(tour => tour.id === id);

    if (index === -1) return null;

    tours[index] = {
      ...tours[index],
      ...patch
    };

    await writeJson(this.filePath, tours);

    return tours[index];
  }

  async remove(id) {
    const tours = await this.list();
    const index = tours.findIndex(tour => tour.id === id);

    if (index === -1) return null;

    tours[index].active = false;
    await writeJson(this.filePath, tours);

    return tours[index];
  }
}

module.exports = { TourRepository };
