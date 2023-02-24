module.exports = class User {
  /**
       * @param {number} id
       * @param {string} user
       * @param {string} pass
       * @param {number} phone
       * @param {string} firstName
       * @param {string} lastName
       * @param {string} country
       * @param {string} subtitle
       * @param {string} photo
       * @param {string} bio
       * @param {string} createdAt
       * @param {string} updatedAt
       */
  constructor(
    id,
    user,
    pass,
    phone,
    firstName,
    lastName,
    country,
    subtitle,
    photo,
    bio,
    createdAt,
    updatedAt,
  ) {
    this.id = id;
    this.user = user;
    this.pass = pass;
    this.phone = phone;
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.country = country;
    this.subtitle = subtitle;
    this.photo = photo;
    this.bio = bio;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};
