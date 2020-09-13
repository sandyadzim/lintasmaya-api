"use strict";
let faker = require("faker/locale/id_ID");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let karyawan = [];
    for (let index = 0; index < 10; index++) {
      karyawan.push({
        email: faker.internet.email(),
        name: faker.name.firstName() + " " + faker.name.lastName(),
        photo: faker.image.people(),
        jabatan: faker.name.jobTitle(),
        deskripsi: faker.name.jobDescriptor(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return await queryInterface.bulkInsert("karyawans", karyawan);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("karyawans", null, {});
  },
};
