const express = require('express')
const router = express.Router()
const User = require('../models/user')
/**
 * Route para tener todos los usuarios
 */

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})
/**
 * Route para tener un solo usuario
 */

router.get('/:id', getUser,(req, res) => {
    res.json(res.user)
})

/**
 * Route para Post un usuario
 */

router.post('/login', async (req, res) => {
    try {
        const users = await User.find({"name": req.body.name, "password": req.body.password}).select("_id")
            res.json(users)
        
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

/**
 * Router para crear un usuario
 */

router.post('/', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    console.log(req.body)
    try {
    
      const newuser = await user.save()
      res.status(201).json(newuser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  async function getUser(req, res, next) {
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'No se ha podido encontrar el usuario'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }
  
  /**
   * route para actualizar un usuario
   */

router.patch('/:id', getUser, (req, res) => {
    
})

/**
 * route para eliminar un usuario
 */

router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Usuario borrado' })
      } catch(err) {
        res.status(500).json({ message: err.message })
      }
})

module.exports = router