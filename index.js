
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


//lectura y parseo del body request
app.use( express.json())

//Carpeta pública

app.use(express.static('public'))

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/hospitales', require('./routes/hospitales.js'))

app.use('/api/medicos', require('./routes/medicos.js'))
app.use('/api/todo', require('./routes/busquedas.js'))

app.use('/api/uploads', require('./routes/uploads.js'))



app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})


