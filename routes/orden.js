const express = require('express')
const router = express.Router()
const Pack = require('../models/orden')
const Orden = require('../models/orden')

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orden = await Orden.find()
        res.json(orden)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Get one orden
router.get('/:id', getOrden,(req, res) => {
    res.json(res.orden)
})



// Create one orden
router.post('/', async (req, res) => {
    const orden = new Orden({
      Guid: req.body.Guid,
      Descripcion: req.body.Descripcion,
      Pack: req.body.Pack
    })
    console.log(req.body)
    try {
    
      const neworden = await orden.save()
      res.status(201).json(neworden)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

  async function getOrden(req, res, next) {
    try {
      orden = await Orden.findById(req.params.id)
      if (orden == null) {
        return res.status(404).json({ message: 'No se ha podido encontrar la ordena'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.orden = orden
    next()
  }
  
// Update one orden
router.patch('/:id', getOrden, (req, res) => {
    
})

// Delete one orden
router.delete('/:id', getOrden, async (req, res) => {
    try {
        await res.orden.remove()
        res.json({ message: 'orden borrada' })
      } catch(err) {
        res.status(500).json({ message: err.message })
      }
})

module.exports = router