const router = require('express').Router();
let User = require("../models/user.models");
var ObjectId = require('mongodb').ObjectId; 
let {Quiz} = require("../models/quiz.models");
let Timer = require("../models/timer.models");
const TimerAttempt = require('../models/timerattempt.models');
router.route('/').get( async(req,res) => {
    try {
        const users = await User.findOne({username: req.query.username});
        if(req.query.username === users.username){
            console.log('username is true');
            if(req.query.password === users.password){
                console.log('password is true');
                res.send([users, true]);
            } else {
                console.log('password is incorrect');
                res.send([null, false]);
            }
        } else {
            console.log('false');
            res.send([null, false]);
        }
        
    }catch (err) {
        console.log(err);
        res.status(400).json('Error' + err);
    
    }});


    router.route('/').post( async (req,res) => {
        try {
            const quizzes = await Quiz.find();
            const quizScores = [];
            for (let i = 0; i < quizzes.length; i++) {
                let score = {
                    title: quizzes[i].name,
                    score: 0
                }
                quizScores.push(score);

            }

            const newUser = User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                quizScores: quizScores
            });
            //this function saves the users to our database
            await newUser.save();
            const user = await User.findOne({username: req.body.username});
            res.send(user);
        } catch (err) {
            res.json(err);
        }
    });

router.route('/feed').get( async (req,res) => {
    try {
        //this function saves the users to our database
        const users = await User.find().sort({_id: -1});
        //users are sent in reverse order so newest to oldest render 
        res.send(users);
    } catch (err) {
        res.json('Error' + err);
    }
});

router.route('/feed').post( async (req,res) => {
    try {

        const _id = new ObjectId(req.body[1]);
        const oldUser = await User.findOne({_id: _id});
        const user = req.body[0];
        if (user.timer == true && oldUser.timer == false) {
            const timer = await Timer.find();
            await User.updateOne({_id: _id}, {timerArray: timer});
        }
        await User.updateOne({_id: _id}, req.body[0]);
        res.send("post function working");
    } catch (err) {
        res.json('Error' + err);
    }
});

router.route('/delete').post( async (req,res) => {
    try {
        const _id = new ObjectId(req.body._id);
        await User.deleteOne({_id: _id});
        res.send("successfully routed to back")
    } catch (err) {
        res.json('Error' + err);
    }
});

router.route('/query').post( async (req,res) => {
    try {
        const reg = new RegExp(req.body.search, 'i');
        const query = await User.find({$or:[{email: {$regex: reg}}, {username: {$regex: reg}}]});
        res.send(query);

    } catch (err) {
    }
});

/*
    The score route is meant to both update the current user's highscore,
    and display the scores of the top 10 users for that specific quiz.

*/

router.route('/score').get(async(req,res) => {
    try {
        const score = req.query.score
        const user = req.query.currentUser
        const quizName = req.query.quiz
        
        const scoreInfo = await User.updateOne(
            {$and:[{username: user},
            {"quizScores.title": quizName}]}, 
            {$max: {"quizScores.$.score": score}});

        const sortedScores = await User.aggregate([{
            $unwind: {path: "$quizScores"}}, 
        {$match: {"quizScores.title": quizName}}, 
        {$sort: {"quizScores.score": -1}}, 
        {$project: {password: 0, email: 0, typeOfUser: 0, quizDash: 0,
             timer: 0, maintenancePlan: 0, _id: 0, __v: 0}}]);
        res.send(sortedScores);
    } catch (err) {
        console.log(err);
        res.status(400).json('Error' + err);
    }
});

router.route("/timer/users").post( async (req,res) => {
    const Attempt = new TimerAttempt(req.body);
    await Attempt.save();
    res.send("connected to the backend")
})
.get(async (req,res) => {
const sortedAttempts = await TimerAttempt.find({}).sort({dateCompleted: -1});
    
    res.send(sortedAttempts);

});
    
module.exports = router;