'use strict';

const faker = require('faker');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Messages';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        title: faker.lorem.words(),
        message: faker.lorem.sentences(),
        photo: "https://i.imgur.com/xTCfqri.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: faker.lorem.words(),
        message: faker.lorem.sentences(),
        photo: "https://i.imgur.com/K4i3rEZb.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: faker.lorem.words(),
        message: faker.lorem.sentences(),
        photo: "https://i.imgur.com/A95v0LUb.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: faker.lorem.words(),
        message: faker.lorem.sentences(),
        photo: "https://i.imgur.com/RUteQr9.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: faker.lorem.words(),
        message: faker.lorem.sentences(),
        photo: "https://i.imgur.com/5trmBJU.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: faker.lorem.words(),
        message: faker.lorem.sentences(),
        photo: "https://i.imgur.com/1GhPAk3.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    options.tableName = 'Messages';
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
