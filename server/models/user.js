const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');

//nos traemos todas las librerias que vamos a usar

const UserSchema = new mongoose.Schema({ 
//para configurar los requirimientos para el registro de usuario

       username:
       {
              type:String, //el tipo de dato
              required:true, //si es requerido
              unique:true,   //si es unico
              minlength: 2,  //minimo de longitud (caracteres)
              maxlength: 50, //maximo de longitud (caracteres)
              trim:true  //elimiendo espacio al inicio y final  
       },
       email:
       {
              type:String,
              required:true,
              unique:true,
              maxlength:100,
              trim:true
       },
       password:
       {
              type:String,
              required:true,
              trim:true
       }
},{
       strict: true 
       //indicamos que sea estrictamento lo que hemos especificado
});

UserSchema.methods.toJSON = function(){
       const user = this; 
       //se usa this para llamar al objeto que pasa el usuario

       return _.pick(user, ['_id', 'username', 'email']);
       //solo retornamos como respuesta el id del usuario, nombre y el email
};

UserSchema.pre('save', function(next)
{//funcion que me permete modificar algo antes de ser guardado en la base de datos
       const user = this;
       
       if(user.isModified('password'))
       {//isModified nos decteca si se modifica o no hay password en la base de datos
                
              bcrypt.hash(user.password, 10)//indicamos lo que vamos a encriptat y el numero de rondas
              .then( hash => {
                     user.password =  hash;
              //igualaos el password del usuario al hash encriptado del bcrypt
                     next();
              })
       }else{
              next();
       }
});

const User = mongoose.model('user', UserSchema);
//igualamos User al modelo de la libreria mongoose que se crear con user y los esquemas que hemos hecho en UserSchema

module.exports = User;