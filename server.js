/**
 * Incluyendo todas las dependencias que necesitamos para el proyecto
 */
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

/**
 * Conectando a la base de datos
 */
mongoose.connect('mongodb://localhost:27017/icecream', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

/**
 * Configurando el get y el post del usuario
 */
const userrouter = require('./routes/user')
app.use('/user', userrouter)

/**
 * Configurando el get y el post de la lista
 */

const listaordenrouter = require('./routes/listas')
app.use('/listaorden', listaordenrouter)

/**
 * Configurando el get y el post de la orden
 */
const ordenrouter = require('./routes/orden')
app.use('/orden', ordenrouter)

app.listen(3000,() => console.log('server started'));

