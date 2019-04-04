const route = require('express').Router();

//importando funcionalidades
const User = require('../models/user');

//sub-rutas de user
route.post('/singUp', (req, res)=>
{
       new User(req.body).save()//creando un nuevo usuario y lo guardamos, devuelve promesa
       .then(user => {//si todo va bien responde con el usuario, config en models user
               
              res.send(user)     
       }).catch( err => {//si algo va mal enviamos un error
              
              res.status(400).send(err.message)
       })
       
});

route.post('/logIn', (req, res) => {

       const { username, email, password} = req.body;

       User.findOne({ email, password})
       .then( user => {
              if(!(user)){
                     return res.status(400).send('Usuario Invalido');
              }else{
                     return res.send(user)
              }
       }).catch(err => { res.status(500).send(err)})
});


module.exports = route; 