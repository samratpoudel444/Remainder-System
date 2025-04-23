'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("remainderTables", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk_remainders_users",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("remainderTables", "fk_remainders_users");
  }
};
