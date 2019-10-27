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
//Solo se permite que el creador de la lista es el que la edite.
  router.patch('/:id', getPack, async (req, res) => {
    if(res.listaorden.creador == res.body.solicitante){
    if (req.body.nombre != null) {
      res.listaorden.nombre = req.body.nombre
    }
  
    if (req.body.expirationDate != null) {
      res.listaorden.expirationDate = req.body.expirationDate
    }
    if (req.body.orden != null) {
      res.listaorden.orden = req.body.orden
    }
    try {
      const updatedlist = await res.listaorden.save()
      res.json(updatedlist)
    } catch {
      res.status(400).json({ message: err.message })
    }
  }
  else{
    res.send("No tienes permiso para editar la lista")
  }
  
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