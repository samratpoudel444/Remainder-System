const Sequelize= require('sequelize');
const config= require("../db/config/config.json");
const dotenv= require('dotenv').config();




const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host:process.env.DB_HOST,
        dialect:config.development.dialect
    }
)

module.exports= sequelize;