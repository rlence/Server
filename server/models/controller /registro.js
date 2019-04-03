const readData = require('./readData');
const id = require('uniqid');
const {comparacion, verificandoIngresoDeDatos} = require('./validate');
const fs = require('fs');
const path = require("path");


module.exports = (req, res) => {
       const data = readData();

       const {userName, email, password} =req.body;

       const datoIngresados = verificandoIngresoDeDatos(req, res, userName, email, password);

       if(datoIngresados === true){

              const validando = comparacion(req, res, userName, email);

              if(validando === true)
              {
                     const newUser = 
                     {
                            id:id.time('U-'),
                            userName,
                            email,
                            password
                     }
       
                     data.users.push(newUser);
       
                     const outData = JSON.stringify(data);
       
                     fs.writeFileSync(path.join(__dirname,'../data/data.json'), outData);
       
                     return res.status(201).json({message:"Usuario creado satisfactoriamente"});
              }else {
                     return console.log(`El usuario que se ingreso ya exite`);
              }

       }else {
              console.log('los datos ingresados en el campo son incorrectos');
       }
}