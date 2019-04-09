const mongoose = require('mongoose');
const _ = require('lodash');

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
       descripccion:{
              type:String,
              required:true,
              trim: true
       },
       precio:{
              type: String,
              required: true,
              trim: true
       },
       estado:{
              active: false
       }
});

TravelSchema.methods.toJSON = function(){
       const travel = this;

       return _.pick(travel, ['_id','viaje','fecha','descripccion','precio']);
};

const Travel = mongoose.model('viaje', TravelSchema);

module.exports = Travel;