'use strict';

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
        title: "The time has come",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut metus a urna commodo fermentum. Morbi ut sagittis velit. Nulla fringilla nunc quis nibh placerat, vel pharetra velit commodo. Etiam vestibulum, urna sit amet molestie iaculis, arcu elit bibendum urna, vel semper nulla leo id turpis. Nunc interdum dolor eu ultrices tempus. Nullam euismod sem a ipsum posuere, vel vestibulum enim luctus. Nulla facilisi. Nullam eget bibendum velit. Donec id congue leo. Sed ac lectus vel tortor sodales interdum. Aliquam erat volutpat. Ut hendrerit eleifend tellus, eget sollicitudin ex. Vivamus venenatis eleifend enim, in feugiat metus consequat nec. Nulla facilisi.",
        photo: "https://i.imgur.com/xTCfqri.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Really the time is here",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut metus a urna commodo fermentum. Morbi ut sagittis velit. Nulla fringilla nunc quis nibh placerat, vel pharetra velit commodo. Etiam vestibulum, urna sit amet molestie iaculis, arcu elit bibendum urna, vel semper nulla leo id turpis. Nunc interdum dolor eu ultrices tempus. Nullam euismod sem a ipsum posuere, vel vestibulum enim luctus. Nulla facilisi. Nullam eget bibendum velit. Donec id congue leo. Sed ac lectus vel tortor sodales interdum. Aliquam erat volutpat. Ut hendrerit eleifend tellus, eget sollicitudin ex. Vivamus venenatis eleifend enim, in feugiat metus consequat nec. Nulla facilisi.",
        photo: "https://i.imgur.com/K4i3rEZb.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "IT IS HERE",
        message: "Time to cut the meat. Get on that grind. Explore the world! Image unrelated.",
        photo: "https://i.imgur.com/A95v0LUb.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "We did it!",
        message: "This might be a few months later but we did it.",
        photo: "https://i.imgur.com/RUteQr9.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "What if...",
        message: "What if this guy had been the Last Jedi?",
        photo: "https://i.imgur.com/5trmBJU.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "This is not my car.",
        message: "But it's a picture of someone else's car!",
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
    return queryInterface.bulkDelete(options, {});
  }
};
