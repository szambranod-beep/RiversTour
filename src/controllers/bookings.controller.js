const { ok } = require("../utils/response");
const { BookingService } = require("../services/bookings.service");

const service = new BookingService();

async function addItem(req, res, next) {
  try {
    return ok(res, 200, await service.addItem(req.user.id, req.body));
  } catch (error) {
    next(error);
  }
}

async function getBooking(req, res, next) {
  try {
    return ok(res, 200, await service.getBooking(req.user.id));
  } catch (error) {
    next(error);
  }
}

async function removeItem(req, res, next) {
  try {
    return ok(res, 200, await service.removeItem(req.user.id, req.params.tourId));
  } catch (error) {
    next(error);
  }
}

async function clearBooking(req, res, next) {
  try {
    return ok(res, 200, await service.clearBooking(req.user.id));
  } catch (error) {
    next(error);
  }
}

module.exports = { addItem, getBooking, removeItem, clearBooking };
