const sequelize = require("../../../db/connection");
const { todaysDate, removeyear } = require("./todaysDate");


const birthdaywish= async()=>
{
 try{
    const today = new Date();
    //extracting the month and date only not the year 
    const date= `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    
    const query=`SELECT firstName, email FROM users WHERE DATE_FORMAT(STR_TO_DATE(DOB, '%Y-%m-%d'), '%m-%d') = :date`

    const [getUserDetails, __]= await sequelize.query(query,
        {
            raw:true,
            replacements:{date}
        }
    )

    if(!getUserDetails || getUserDetails.length == 0)
    {
        console.log("No birthday found for today");
        return false;
    }
        return getUserDetails;
    

 }
 catch(err)
 {
    console.log(err);
 }
    
    
    
}

module.exports= {birthdaywish}