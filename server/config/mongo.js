const mongoose = require('mongoose');

console.log(process.env.PORT);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/viajes', {useNewUrlParser: true});

module.exports = mongoose;