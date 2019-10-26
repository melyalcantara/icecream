const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Get all users
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
})

// Update one user
router.patch('/:id', (req, res) => {
})

// Delete one user
router.delete('/:id', (req, res) => {
})

module.exports = router