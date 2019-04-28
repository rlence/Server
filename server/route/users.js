const route = require('express').Router();
const _ = require('lodash');

//importando funcionalidades
const User = require('../models/user');
const { autorization, isAdmin} = require('../middelware/autorization');

//sub-rutas de user
route.post('/register', (req, res)=>//ruta publica
{
       new User(req.body).save()//creando un nuevo usuario y lo guardamos, devuelve promesa
       .then(user => {//si todo va bien responde con el usuario, config en models user
               
              res.send(user)     
       }).catch( err => {//si algo va mal enviamos un error
              
              res.status(400).send(err.message)
              
       })
       
});

route.post('/logIn', async (req, res) => {//ruta publica

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

route.get('/me', autorization, (req, res)=>{//privada
       res.send(req.user)
});

route.patch('/me', autorization, async (req, res)=>{ //privada
       try{
              req.body = _.pick(req.body, ['username', 'email'])

              await req.user.update(req.body)

              res.send(await User.findById(req.user));
       }catch(err){
              res.status(400).send(err.message);
       }
});


module.exports = route; 