const { HttpError } = require("../utils/httpError");
const { BookingRepository } = require("../repositories/booking.repository");
const { TourRepository } = require("../repositories/tour.repository");

class BookingService {
  constructor() {
    this.bookingRepo = new BookingRepository();
    this.tourRepo = new TourRepository();
  }

  async addItem(userId, dto) {
    const tourId = String(dto.tourId || "").trim();
    const quantity = dto.quantity;

    if (!tourId || typeof quantity !== "number" || quantity <= 0) {
      throw new HttpError(422, "VALIDATION_ERROR", "tourId y quantity son obligatorios");
    }

    const tour = await this.tourRepo.findById(tourId);

    if (!tour || tour.active !== true) {
      throw new HttpError(404, "NOT_FOUND", "Tour no existe");
    }

    if (tour.availableSpots < quantity) {
      throw new HttpError(409, "CONFLICT", "No hay suficientes cupos disponibles");
    }

    const booking = await this.bookingRepo.findByUserId(userId);

    const existing = booking.items.find(item => item.tourId === tourId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      booking.items.push({
        tourId,
        name: tour.name,
        price: tour.price,
        duration: tour.duration,
        quantity
      });
    }

    return await this.bookingRepo.save(booking);
  }

  async getBooking(userId) {
    return await this.bookingRepo.findByUserId(userId);
  }

  async removeItem(userId, tourId) {
    const booking = await this.bookingRepo.findByUserId(userId);

    booking.items = booking.items.filter(item => item.tourId !== tourId);

    return await this.bookingRepo.save(booking);
  }

  async clearBooking(userId) {
    const booking = await this.bookingRepo.findByUserId(userId);

    booking.items = [];

    return await this.bookingRepo.save(booking);
  }
}

module.exports = { BookingService };
