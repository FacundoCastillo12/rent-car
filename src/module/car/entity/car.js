module.exports = class Car {
  /**
     * @param {number} id
     * @param {string} brand
     * @param {string} model
     * @param {number} year
     * @param {number} kms
     * @param {string} colour
     * @param {string} air
     * @param {number} passenger
     * @param {string} img
     * @param {string} transmission
     * @param {number} price
     * @param {string} createdAt
     * @param {string} updatedAt
     */
  constructor(
    id,
    brand,
    model,
    year,
    kms,
    colour,
    air,
    passenger,
    img,
    transmission,
    price,
    createdAt,
    updatedAt,
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.colour = colour;
    this.air = air;
    this.passenger = passenger;
    this.img = img;
    this.transmission = transmission;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};
