const { HttpError } = require("../utils/httpError");
const { OrderRepository } = require("../repositories/order.repository");
const { BookingRepository } = require("../repositories/booking.repository");
const { TourRepository } = require("../repositories/tour.repository");

class OrderService {
  constructor() {
    this.orderRepo = new OrderRepository();
    this.bookingRepo = new BookingRepository();
    this.tourRepo = new TourRepository();
  }

  async pay(userId) {
    const booking = await this.bookingRepo.findByUserId(userId);

    if (!booking.items || booking.items.length === 0) {
      throw new HttpError(409, "CONFLICT", "La reserva está vacía");
    }

    let total = 0;

    for (const item of booking.items) {
      const tour = await this.tourRepo.findById(item.tourId);

      if (!tour || tour.active !== true) {
        throw new HttpError(404, "NOT_FOUND", `Tour no existe: ${item.tourId}`);
      }

      if (tour.availableSpots < item.quantity) {
        throw new HttpError(409, "CONFLICT", `Cupos insuficientes para: ${tour.name}`);
      }

      total += item.price * item.quantity;

      await this.tourRepo.update(tour.id, {
        availableSpots: tour.availableSpots - item.quantity
      });
    }

    const order = await this.orderRepo.create({
      userId,
      items: booking.items,
      total,
      status: "paid"
    });

    booking.items = [];
    await this.bookingRepo.save(booking);

    return {
      message: "Reserva pagada correctamente",
      order
    };
  }

  async listByUser(userId) {
    return await this.orderRepo.findByUserId(userId);
  }
}

module.exports = { OrderService };
