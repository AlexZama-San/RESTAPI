const mongoose = require('mongoose');
const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS, {


        })
        
        console.log('DB Connected');
    }catch(err){
        console.log(err);
        throw new  Error("Error en la base de datos")
    }


}



module.exports = {
    dbConnection
}