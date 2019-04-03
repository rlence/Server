const route = require('express').Router();

//importando funcionalidades
const registroUser = require('../models/controller /registro');

//sub-rutas de user
route.post('/singUp', registroUser);

route.post('/logIn');

route.put('/logIn/userEdit');

route.delete('/logIn/userDelete');

module.exports = route; 