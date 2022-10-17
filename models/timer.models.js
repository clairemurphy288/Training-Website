const mongoose = require('mongoose');
//This file is the schema for each user's log-in data
const Schema = mongoose.Schema;

const stepSchema = new Schema({
    stepName: {
        type: String
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
});



const Timer = mongoose.model('Timer', timerSchema);

module.exports = Timer;