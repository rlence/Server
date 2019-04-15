const route = require('express').Router();
const Travel = require('../models/viajes');
const multer = require('../config/multer');
const {autorization, isAdmin} = require('../middelware/autorization')
//obteniendo viajes
route.get('/', async (req, res)=>{//publica
        await Travel.find({})
        .then( viaje => res.status(200).send(viaje))
        .catch( err => res.status(404).send(err.message))
});

//creando viajes
route.post('/',(req, res) => {//privada de administrador
       new Travel(req.body).save()
       .then( travel => {
              res.send(travel)
       }).catch( err => {
              res.status(400).send(err.message)
       })
});

//subiendo imagenes

route.get('/image' ,(req,res)=> { //privada
       res.render('../views/index.hbs')
});

route.post('/uploads/:id', multer.single('file'), async (req, res)=>{
       try{
              const id= req.params.id
              console.log('id',id);
              const travel = await Travel.findOneAndUpdate({ _id: id }, {imagen: req.file.originalname},{new: true })
              console.log('viaje',travel);
              if(travel === null){

                     res.status(400).send('El id del viaje no es valido')
              }else{

                     res.send(travel)
              }
       }catch(err){
              res.status(500).json({message:'error de servidor'})
       }
});

route.get('/activo/:id', async (req, res)=>{//activo o desactivado
   try{
              const {id} = req.param

              await Travel.update({_id : id},req.body)
              //Travel.estado == !Travel.estado
              //Travel.save()
              return res.status(400).send(Travel);
       }catch (err){
              return res.status(400).send('El id no es valido')
       }
});

//modificando viajes
route.patch('/:id',async (req, res)=>{//privada de administrador
       try{
              const {id} = req.params

              await Travel.update({_id : id}, req.body)
       
              return res.send({message:'cambio exitoso'})
       }catch (err){
              return res.status(400).send('El id no es valido')
       }
       
});

//eliminando viajes
route.delete('/:id',async (req, res)=>{ //privada de administrador
     try{

       const {id} = req.params

       await Travel.remove({_id : id});

       return res.send({message: 'elimando satisfactoriamente'})

     }catch (err){
       return res.status(400).send('El id no es valido')
     }  
});


module.exports = route;