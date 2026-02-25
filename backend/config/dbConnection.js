const mongoose = require("mongoose");
const dbConnection = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then((data)=>console.log(`database is connected with ${data.connection.host}  `))
    .catch((error)=>console.log(error))
}
module.exports = dbConnection


