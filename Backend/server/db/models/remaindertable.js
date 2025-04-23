'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class remainderTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  remainderTable.init({
    id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'remainderTable',
  });
  return remainderTable;
};