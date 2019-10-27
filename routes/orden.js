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
router.post('/:id', getPack ,async (req, res) => {
  if(res.listaorden.expirationDate <= Date.now()){
    const orden = new Orden({
      Guid: req.body.Guid,
      Descripcion: req.body.Descripcion,
      Pack: req.body.Pack
    })
    console.log(req.body)
    try {
    
      const neworden = await orden.save()
      res.listaorden.orden.push(neworden._id)
      res.status(201).json(neworden)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  else{
    res.send("La duracion ha expirado")
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
  
  async function getPack(req, res, next) {
    try {
      listaorden = await Pack.findById(req.params.id)
      if (listaorden == null) {
        return res.status(404).json({ message: 'No se ha podido encontrar la lista' + req.params.id})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.listaorden = listaorden
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