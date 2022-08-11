const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
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
    //Going to use some other validation for passwords :/
    // password: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 6,
    //     maxlength: 20
    // },
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

userSchema.plugin(passportLocalMongoose)
//This variable refers to our collection within our db
const User = mongoose.model('User', userSchema);

module.exports = User;

