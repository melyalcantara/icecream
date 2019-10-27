const mongoose = require('mongoose')

const ordenSchema = new mongoose.Schema({
  Descripcion: {
    type: String,
    required: true
  },
  Size: {
    type: String,
    
  },
  Sabor: {
    type: String,
    required: true
  },
  Guid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  Pack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pack',
    required: true
  },


  Precio: {
    type: String,
    
  },

  Metododepago: {
      type: String,
      enum: ['EFECTIVO','TARJETA'],
      default: 'EFECTIVO'
  },

  Pagado: {
    type: Boolean,
    default: false,

  }
})
// Un solo usuario solo puede tener una lista
ordenSchema.index({
    Guid: 1,
    Pack: 1,
},
{
unique:true
})
module.exports = mongoose.model('Orden',ordenSchema)