require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/icecream', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

//configurando el get y el post del usuario
const userrouter = require('./routes/user')
app.use('/user', userrouter)

//configurando el get y el post de la lista
const listaordenrouter = require('./routes/listas')
app.use('/listaorden', listaordenrouter)

//configurando el get y el post de la orden
const ordenrouter = require('./routes/orden')
app.use('/orden', ordenrouter)

app.listen(3000,() => console.log('server started'));

