
const mongoose = require('mongoose')

const dbConnection = async ()=>{
    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('DB OnLine')
    } catch (error) {
        console.log(error);
        throw new Error('Error de conexion en DB, mirar logs')
    }

} 

module.exports={
    dbConnection
}