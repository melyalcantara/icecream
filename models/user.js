const mongoose = require('mongoose')

/**
 * modelos Schema de mogoose 
 */

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
/**
 *  Un solo usuario solo puede tener un solo email
 */

userSchema.index({
  email: 1,
  status: 1,
},
{
unique:true
})


module.exports = mongoose.model('User',userSchema)