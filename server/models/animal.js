const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const animalSchema = new Schema({ 
 animalName: {
    type: String,
    required: true,
    unique:true,
    // minlength: 1,
    // maxlength: 280,
    trim: true,
  },
  otherName: {
    type: String,
    trim: true,
  },
  class:{
    type: String,
    required: true,
  },
  family: {
  type: String,
  required: true,
  trim: true,
},
 age: {
  type: String,
  required: true,
 },
foods : {
 type: String,
 trim: true,
},
population : {
 type: String,
 trim: true,
},
image :[
   {
  type: String,
  trim: true,
 }
],

threats : {
 type: String,
 trim: true,
},
location : [
 {
 type: String,
 trim: true,
},
],
locationmap :  {
  type: String,
  trim: true,
 },
description : {
 type: String,
 required: true,
 minlength: 1,
 maxlength: 7000,
 trim: true,
},
submitBy : {
 type: Schema.Types.ObjectId,
 ref: 'User'
},
submitOn: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
// editedBy: {
//   type: Schema.Types.ObjectId,
//   ref: 'user'
//    },
//   editedOn: {
//       type: Date,
//       default: Date.now,
//       get: (timestamp) => dateFormat(timestamp),
//     },
  });

const Animal = model('Animal', animalSchema);

module.exports = Animal;
