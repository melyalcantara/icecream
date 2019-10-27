const mongoose = require('mongoose')

const packSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Pack',packSchema)