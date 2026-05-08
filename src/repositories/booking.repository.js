const path = require("path");
const crypto = require("crypto");
const { readJson, writeJson } = require("../utils/fileDb");

class BookingRepository {
  constructor() {
    this.filePath = path.join(__dirname, "../../data/bookings.json");
  }

  async list() {
    return await readJson(this.filePath);
  }

  async findByUserId(userId) {
    const bookings = await this.list();

    let booking = bookings.find(
      b => b.userId === userId && b.status === "pending"
    );

    if (!booking) {
      booking = {
        id: crypto.randomUUID(),
        userId,
        status: "pending",
        items: [],
        createdAt: new Date().toISOString()
      };

      bookings.push(booking);
      await writeJson(this.filePath, bookings);
    }

    return booking;
  }

  async save(booking) {
    const bookings = await this.list();
    const index = bookings.findIndex(b => b.id === booking.id);

    if (index === -1) {
      bookings.push(booking);
    } else {
      bookings[index] = booking;
    }

    await writeJson(this.filePath, bookings);

    return booking;
  }
}

module.exports = { BookingRepository };
