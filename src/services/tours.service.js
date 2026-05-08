const { HttpError } = require("../utils/httpError");
const { TourRepository } = require("../repositories/tour.repository");

class TourService {
  constructor() {
    this.tourRepo = new TourRepository();
  }

  async list() {
    const tours = await this.tourRepo.list();
    return tours.filter(tour => tour.active === true);
  }

  async getById(id) {
    const tour = await this.tourRepo.findById(id);

    if (!tour || tour.active !== true) {
      throw new HttpError(404, "NOT_FOUND", "Tour no existe");
    }

    return tour;
  }

  async create(dto) {
    const name = String(dto.name || "").trim();
    const price = dto.price;
    const duration = dto.duration;
    const maxCapacity = dto.maxCapacity;
    const location = String(dto.location || "").trim();
    const category = String(dto.category || "").trim();

    if (!name)
      throw new HttpError(422, "VALIDATION_ERROR", "name es obligatorio");

    if (typeof price !== "number" || price <= 0)
      throw new HttpError(422, "VALIDATION_ERROR", "price debe ser mayor a 0");

    if (typeof duration !== "number" || duration <= 0)
      throw new HttpError(422, "VALIDATION_ERROR", "duration es obligatorio y debe ser mayor a 0");

    if (typeof maxCapacity !== "number" || maxCapacity <= 0)
      throw new HttpError(422, "VALIDATION_ERROR", "maxCapacity es obligatorio y debe ser mayor a 0");

    if (!location)
      throw new HttpError(422, "VALIDATION_ERROR", "location es obligatoria");

    if (!category)
      throw new HttpError(422, "VALIDATION_ERROR", "category es obligatoria");

    return await this.tourRepo.create({
      name,
      price,
      duration,
      maxCapacity,
      availableSpots: maxCapacity,
      location,
      category,
      description: String(dto.description || "").trim(),
      includes: Array.isArray(dto.includes) ? dto.includes : [],
      meetingPoint: String(dto.meetingPoint || "").trim()
    });
  }

  async update(id, dto) {
    const current = await this.tourRepo.findById(id);

    if (!current || current.active !== true) {
      throw new HttpError(404, "NOT_FOUND", "Tour no existe");
    }

    const patch = {};

    if (dto.name !== undefined) patch.name = String(dto.name).trim();
    if (dto.price !== undefined) patch.price = dto.price;
    if (dto.duration !== undefined) patch.duration = dto.duration;
    if (dto.maxCapacity !== undefined) patch.maxCapacity = dto.maxCapacity;
    if (dto.availableSpots !== undefined) patch.availableSpots = dto.availableSpots;
    if (dto.location !== undefined) patch.location = String(dto.location).trim();
    if (dto.category !== undefined) patch.category = String(dto.category).trim();
    if (dto.description !== undefined) patch.description = String(dto.description).trim();
    if (dto.includes !== undefined) patch.includes = dto.includes;
    if (dto.meetingPoint !== undefined) patch.meetingPoint = String(dto.meetingPoint).trim();

    return await this.tourRepo.update(id, patch);
  }

  async remove(id) {
    const tour = await this.tourRepo.remove(id);

    if (!tour) {
      throw new HttpError(404, "NOT_FOUND", "Tour no existe");
    }
  }
}

module.exports = { TourService };
