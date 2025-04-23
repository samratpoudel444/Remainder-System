'use strict';

const sequelize = require('../connection');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('remainderTables', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      remainderName: {
        type: Sequelize.STRING,
        allowNull:false,

      },

      remainderType:{
        type: Sequelize.ENUM("BirthdayRemainder", "TaskRemainder", "BillPayemntRemainder", "MedicationReminders", "MeetingRemainder"),
        allowNull:false
      },
      remainderDate:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      message:{
        type: Sequelize.TEXT,
        allowNull:false,
      },
      userId:{
        type: Sequelize.STRING,
        allowNull:false,
        references: {
          model: 'Users', 
          key: 'id'
        }
      },


      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        type: Sequelize.DATE,
        onUpdate: Sequelize.fn("NOW")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('remainderTables');
  }
};