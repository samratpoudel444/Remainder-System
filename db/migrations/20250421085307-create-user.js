'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Password:{
        allowNull: false,
        type: Sequelize.STRING
      },
      DOB:{
        allowNull: false,
        type: Sequelize.STRING
      },
      PhoneNo:{
        allowNull: false,
        type: Sequelize.STRING
      },
      Address:{  
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn("NOW")
      },
      updatedAt: {
        type: Sequelize.DATE,
        onUpdate: Sequelize.fn("NOW"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};