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
router.get('/:id', (req, res) => {
})

// Create one user
router.post('/', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
  
    try {
      const newuser = await user.save()
      res.status(201).json(newuser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
// Update one user
router.patch('/:id', (req, res) => {
})

// Delete one user
router.delete('/:id', (req, res) => {
})

module.exports = router