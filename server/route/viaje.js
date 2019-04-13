const route = require('express').Router();
const Travel = require('../models/viajes');
const multer = require('../config/multer');

//obteniendo viajes
route.get('/', async (req, res)=>{
        await Travel.find({})
        .then( viaje => res.status(200).send(viaje))
        .catch( err => res.status(404).send(err.message))
});

//creando viajes
route.post('/', (req, res) => {
       new Travel(req.body).save()
       .then( viaje => {
              res.send(viaje)
       }).catch( err => {
              res.status(400).send(err.message)
       })
});

//subiendo imagenes

route.get('/image', (req,res)=> {
       res.render('../views/index.hbs')
});

route.post('/uploads', multer.single('file'),(req, res)=>{
       res.send(req.file)
});

//modificando viajes
route.patch('/:id', async (req, res)=>{
       try{
              const {id} = req.params

              await Travel.update({_id : id}, req.body)
       
              return res.send({message:'cambio exitoso'})
       }catch (err){
              return res.status(400).send('El id no es valido')
       }
       
});

//eliminando viajes
route.delete('/:id', async (req, res)=>{
     try{

       const {id} = req.params

       await Travel.remove({_id : id});

       return res.send({message: 'elimando satisfactoriamente'})

     }catch (err){
       return res.status(400).send('El id no es valido')
     }  
});


module.exports = route;