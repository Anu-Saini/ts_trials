const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const bcrypt = require('bcrypt');
const userSchema = new Schema({ 
 userName: {
    type: String,
    // required: 'You need to leave a thought!',
    required: true,
    // minlength: 1,
    // maxlength: 280,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Must match an email address!']

  },
  password: {
   type: String,
   required: true,
   trim: true,
   minLength:8, 
 },
//  Animals: [
//   {
//     type:Schema.Types.ObjectId,
//     ref: 'Animals'
//   },
//  ],
 });

  // setting up pre-save middleware to create password
  userSchema.pre('save', async function (next) {
    if(this.isnew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password,saltRounds);
    }
    next();
  }) 


  //compare ths incomming passowrd with the hashed password
  userSchema.methods.isCorrectPassword = function(password) {
    return bcrypt.compare(password,this.password);
  };

const User = model('User', userSchema);

module.exports = User;
