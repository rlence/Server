const route = require('express').Router();
 

//rutas principales

route.get('/', (req, res)=> {
       res.send('funciona ruta inicial');
});

route.use('/user', require('./users'));

module.exports = route;