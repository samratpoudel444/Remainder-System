const sequelize = require("./db/connection");
const { authServer } = require("./service/authService");
const { remainderService } = require("./service/remainderService");


const startFunction= async()=>
{
    sequelize.authenticate().then(()=>
    {
        authServer();
        remainderService();
    })
}

startFunction();