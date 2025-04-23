const { DATEONLY } = require("sequelize");
const sequelize = require("../../db/connection");

const getAllRemainder= async()=>
{   
    const date = new Date().toISOString().slice(0, 10);

    console.log(date)


    try{
        const query= `SELECT a.remainderName, a.remainderType, a.message, a.userId, b.email FROM remaindertables 
        AS a JOIN users AS b ON a.userId = b.id WHERE a.remainderDate = :date`;
        
        const [remainderData, _]= await sequelize.query(query,
            {
                raw:true,
                replacements:{
                    date
                }
            }
        )

        if(!remainderData || remainderData.length == 0)
        {
            return false;
        }
        else
        {
            return remainderData
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports= {getAllRemainder}