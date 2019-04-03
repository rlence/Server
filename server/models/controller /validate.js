const readData = require('./readData');
const validator = require('validator');

const verificandoIngresoDeDatos = (req, res, userName, email,password) => 
{
        if(!(userName && email && password)){
                res.status(400).json({message:"Introduce el valor de todos los campos"});
                return false;
         }
  
         if(password.length < 8){
                res.status(400).json({message:"son 8 o mas caracteres"});
                return false;
         }
  
         if(!(validator.isEmail(email))){
                res.status(400).json({message:"Ingresa un email valido por favor"});
                return false;
         }
         return true;
};
const comparacion = (req, res, userName, email) => 
{
              const data = readData();
     
              if(data.users.find( user => user.userName.toLowerCase() === userName.toLowerCase())){
                      res.status(400).json({message:"El nombre de usuario ya existe"});
                      return false;
              }

              if(data.users.find(user => user.email.toLowerCase() === email.toLowerCase())){
                      res.status(400).json({message:"El email ya existe con otro usuario"});
                      return false;
              } 

              return true;
};

const comparacionLogIn = (req, res, userName, email, password) => 
{
        const data = readData();

        const user = data.users.find(user => user.userName.toLowerCase() === userName.toLowerCase());

        if(!(user) 
           || !(user.email.toLowerCase() === email.toLowerCase())
           || !(user.password === password))
           {
                   return res.status(400).json({message: 'El nombre de usuario o email o password son inconrrectos'});
           }else{
                   return res.status(200).json({message:'Acceso conseguido', user});
           }
};


module.exports = {comparacion, verificandoIngresoDeDatos, comparacionLogIn };