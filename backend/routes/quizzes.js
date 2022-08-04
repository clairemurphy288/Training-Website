const router = require('express').Router();
let {Quiz} = require("../models/quiz.models");

router.route('/quizzes').get(async(req,res) => {
    try {
        console.log('quiz-number');
        const quizInfo = await Quiz.find();
        const quizTitles = []
        for(let i = 0; i < quizInfo.length; i++) {
            quizTitles.push(quizInfo[i].name);
        }
        res.send([quizTitles,quizInfo]);
    } catch (err) {
        console.log(err);
        res.status(400).json('Error' + err);
    }
});

router.route('/questionss').get(async(req,res) => {
    try {
        const questionInfo = await Quiz.find();
        res.send(questionInfo);
    } catch (err) {
        console.log(err);
        res.status(400).json('Error' + err);
    }
});

module.exports = router;