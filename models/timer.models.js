const mongoose = require('mongoose');
//This file is the schema for each user's log-in data
const Schema = mongoose.Schema;

const stepSchema = new Schema({
    stepName: {
        type: String
    }, image : {
        data: Buffer,
        contentType: String,
    }
});

const timerSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    standardWork: {
        type: Number,
        default: 1
    },

    process: {
        type: [stepSchema]
    },
});



const Timer = mongoose.model('Timer', timerSchema);

module.exports = Timer;