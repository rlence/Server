require('./config');
const express = require('express');
const app = express();
const hbs = require('hbs');
//para handlebars


//puerto
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//motor de renderizado para hbs
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

//usando rutas
app.use(require('./route')); //exportando todas las rutas principales

//servidor escuchando
app.listen(PORT, ()=> {
       console.log(`Server listening at ${PORT}` );
});                                                                          