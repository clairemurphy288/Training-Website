const mongoose = require('mongoose');
//This file is the schema for each user's log-in data
const Schema = mongoose.Schema;

const stepSchema = new Schema({
    stepName: {
        type: String
    },
    actualTime : {
        type: Number,
        default: 0
    },
    performedTime : {
        type: Number,
        default: 0
    }
});

const timerSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    process: {
        type: [stepSchema]
    },
    actualTotalTime: {
        type: Number,
        default: 0
    },
    performedTotalTime: {
        type: Number,
        default: 0
    }
});



const Timer = mongoose.model('Timer', timerSchema);

module.exports = Timer;