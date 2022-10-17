const mongoose = require('mongoose');
//This file is the schema for each user's log-in data
const Schema = mongoose.Schema;


const attemptSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    actualTime: {
        type: Array
    },
    performedTime: {
        type: Array
    },
    actualTotalTime: {
        type: Number
    },
    performedTotalTime: {
        type: Number
    }, dateCompleted: {
        type: Date
    }
});



const TimerAttempt = mongoose.model('TimerAttempt', attemptSchema);

module.exports = TimerAttempt;