const mongoose = require('mongoose');
//This file is the schema for each user's log-in data
const Schema = mongoose.Schema;

//I utilized some of mongoose's built in validation.
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
        maxlength: 20

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    typeOfUser : {
        type: String,
        default: "standard"
    },
    //These booleans will be used to customize the dashboard of each user.
    quizDash: {
        type: Boolean,
        default: true
    },
    timer: {
        type: Boolean,
        default: false
    },
    maintenancePlan: {
        type: Boolean,
        default: false
    }

});

//This variable refers to our collection within our db
const User = mongoose.model('User', userSchema);

module.exports = User;

