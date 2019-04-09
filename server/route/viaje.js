const route = require('express').Router();
const Travel = require('../models/viajes');


route.get('/', async (req, res)=>{
        await Travel.find({})
        .then( viaje => res.status(200).send(viaje))
        .catch( err => res.status(404).send(err.message))
});

route.post('/', (req, res) => {
       new Travel(req.body).save()
       .then( viaje => {
              res.send(viaje)
       }).catch( err => {
              res.status(400).send(err.message)
       })
});


route.patch('/:id', async (req, res)=>{
       try{
              const {id} = req.params

              await Travel.update({_id : id}, req.body)
       
              return res.send({message:'cambio exitoso'})
       }catch (err){
              return res.status(400).send('El id no es valido')
       }
       
});

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