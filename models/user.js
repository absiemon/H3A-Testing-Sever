const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    }
    
});

const User = mongoose.model('user', UserSchema); 
// User.createIndexes();    //used for unique entry in the database(it will create a unique index in the database for each entry)
module.exports =  User;