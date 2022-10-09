const mongoose = require('mongoose');
//This file is the schema for each quiz 
const Schema = mongoose.Schema;
//Schema for the questions and validation
const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answerChoices: {
        type: Array,
        required: true
    },
    indexOfAnswer: {
        type: Number
    }



});
//Schema for the quiz which uses questionSchema 
const quizSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    questions: {
        type: [questionSchema],
        required: true
    },

});
//This creates the quizzes collection
const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = {Quiz};