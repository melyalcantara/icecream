const express = require('express')
const router = express.Router()
const Pack = require('../models/listaorden')

// Get all lists
router.get('/', async (req, res) => {
    try {
        const listaorden = await Pack.find()
        res.json(listaorden)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Get one list
router.get('/:id', getPack,(req, res) => {
    res.json(res.listaorden)
})



// Create one list
router.post('/', async (req, res) => {
    const listaorden = new Pack({
      creador: req.body.creador,
      nombre:req.body.nombre,
    })
    console.log(req.body)
    try {
    
      const newlistaorden = await listaorden.save()
      res.status(201).json(newlistaorden)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

  async function getPack(req, res, next) {
    try {
      listaorden = await Pack.findById(req.params.id)
      if (listaorden == null) {
        return res.status(404).json({ message: 'No se ha podido encontrar la lista'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.listaorden = listaorden
    next()
  }
  
// Update one list
router.patch('/:id', getPack, (req, res) => {
    
})

// Delete one list 
router.delete('/:id', getPack, async (req, res) => {
    try {
        await res.listaorden.remove()
        res.json({ message: 'Lista borrada' })
      } catch(err) {
        res.status(500).json({ message: err.message })
      }
})

module.exports = router