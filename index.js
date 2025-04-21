const sequelize = require("./db/connection");
const { authServer } = require("./service/authService");
const startFunction= async()=>
{
    sequelize.authenticate().then(()=>
    {
        authServer();
    })
}

startFunction();