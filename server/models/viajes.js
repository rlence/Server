const mongoose = require('mongoose');
const _ = require('lodash');
const url = 'localhost://8080/public/uploads'

const TravelSchema = new mongoose.Schema({

       viaje:{
              type: String,
              required:true,
              trim:true
       },
       fecha:{
              type: Date,
              default: Date.now,
              required: true,
              trim: true
       },
       descripcion:{
              type:String,
              required:true,
              trim: true,
              minlength:5,
              maxlength:50
       },
       precio:{
              type: String,
              required: true,
              default:0
       },
       estado:{
              type: Boolean,
              default: false
       },
       imagen: {
              type: String,
              set: function(value){
                     return `${url}/${value}`
              }
       }
});

TravelSchema.methods.toJSON = function(){
       const travel = this;

       return _.pick(travel, ['_id','viaje','fecha','descripccion','precio','estado','imagen']);
};

const Travel = mongoose.model('travel', TravelSchema);

module.exports = Travel;