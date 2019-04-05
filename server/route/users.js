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

route.post('/logIn', async (req, res) => {

       const { username, email, password} = req.body;

     if(!email || !password)
     {
            return res.status(400).send('Datos invalidos, relleno el campo');
     }
     const user =  await User.findByCredentials(req.body);

     if(!user){
            return res.status(401).send({message: "Invalid Credencial"});
     }

     const token = await user.createLogInToken();
     res.header('Authorization', token).send(user);
});


module.exports = route; 