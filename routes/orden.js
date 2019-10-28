const express = require('express')
const router = express.Router()
const Pack = require('../models/listaorden')
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
router.post('/', getLista ,async (req, res) => {
  console.log(res.listaorden.expirationDate)
  if(res.listaorden.expirationDate > new Date()){
    const orden = new Orden({
      Guid: req.body.Guid,
      Descripcion: req.body.Descripcion,
      Size: req.body.Size,
      Sabor: req.body.Sabor,
      Pack: req.body.Pack
    })
    
    try {
      console.log(orden)
      const neworden = await orden.save()
      res.listaorden.Orden.push(neworden._id)
      const addtoarray = await res.listaorden.save()
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
  
  async function getLista(req, res, next) {
    try {
      listaorden = await Pack.findById(req.body.Pack)
      if (listaorden == null) {
        return res.status(404).json({ message: 'No se ha podido encontrar la lista'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
    console.log(listaorden)
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