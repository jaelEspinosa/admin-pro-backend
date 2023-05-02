
require('dotenv').config()


const express = require('express')
const { dbConnection } = require('./database/config.js')
const cors = require('cors')

// Crear el servidor de express
const app = express()

// configurar CORS
app.use(cors())

//connectarDB
dbConnection()

//Rutas
app.get('/', (req, res)=>{
  res.json({
    ok:true,
    msg:'hola mundo'
  })
})




app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})


