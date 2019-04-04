require('./config');
const express = require('express');
const app = express();

//para handlebars


//puerto
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//usando rutas
app.use(require('./route')); //exportando todas las rutas principales

//servidor escuchando
app.listen(PORT, ()=> {
       console.log(`Server listening at ${PORT}` );
});                                                                          