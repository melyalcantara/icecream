const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Get one user
router.get('/:id', getUser,(req, res) => {
    res.json(res.user)
})

// Post one user
router.post('/login', async (req, res) => {
    try {
        const users = await User.find({"name": req.body.name, "password": req.body.password}).select("_id")
            res.json(users)
        
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Create one user
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
  
// Update one user
router.patch('/:id', getUser, (req, res) => {
    
})

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Usuario borrado' })
      } catch(err) {
        res.status(500).json({ message: err.message })
      }
})

module.exports = router