module.exports = class User {
  /**
       * @param {number} id
       * @param {string} firstName
       * @param {string} lastName
       * @param {string} docType
       * @param {number} docNumber
       * @param {string} nationality
       * @param {string} address
       * @param {string} phone
       * @param {string} email
       * @param {string} birthdate
       * @param {string} createdAt
       * @param {string} updatedAt
       */
  constructor(
    id,
    firstName,
    lastName,
    docType,
    docNumber,
    nationality,
    address,
    phone,
    email,
    birthdate,
    createdAt,
    updatedAt,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.docType = docType;
    this.docNumber = docNumber;
    this.nationality = nationality;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.birthdate = birthdate;
    this.formattedBirthdate = this.formatBirthdate();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  formatBirthdate() {
    return new Date(this.birthdate).toLocaleString(false, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC',
    });
  }
};
