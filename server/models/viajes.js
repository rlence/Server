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
       }
});

TravelSchema.methods.toJSON = function(){
       const travel = this;

       return _.pick(travel, ['_id','viaje','fecha','descripccion','precio']);
};

const Travel = mongoose.model('viaje', TravelSchema);

module.exports = Travel;