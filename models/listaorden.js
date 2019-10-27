const mongoose = require('mongoose')

const packSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },

  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  Orden: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orden',
  }],

  CreationDate: {
      type: Date,
      default: Date.now()
  },

  expirationDate: {
    type: Date,
    default: (Date.now() + 2400000)

  }
})
// Un solo usuario solo puede tener una lista
packSchema.index({
    _id: 1,
    creador: 1,
},
{
unique:true
})

module.exports = mongoose.model('Pack',packSchema)