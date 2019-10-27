const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,

  }
})

// Un solo usuario solo puede tener una lista
userSchema.index({
  email: 1,
  status: 1,
},
{
unique:true
})


module.exports = mongoose.model('User',userSchema)