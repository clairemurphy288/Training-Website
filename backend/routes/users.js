const router = require('express').Router();
let User = require("../models/user.models");
var ObjectId = require('mongodb').ObjectId; 


router.route('/').get( async(req,res) => {
    try {
        console.log(req.query);
        const users = await User.findOne({username: req.query.username});
        if(req.query.username === users.username){
            console.log('username is true');
            if(req.query.password === users.password){
                console.log('password is true');
                res.send([users, true]);
            } else {
                console.log('password is incorrect');
                console.log(users.password);
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
            const newUser = User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });
            //this function saves the users to our database
            await newUser.save();
            res.send("User added successfullly");
        } catch (err) {
            res.json('Error' + err);
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
        console.log(req.body)
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
    The score route is meant to both update the curerent user's highscore,
    and display the scores of the top 10 users for that specific quiz.

*/

router.route('/score').get(async(req,res) => {
    try {
        const score = req.query.score
        const user = req.query.currentUser
        const quizName = req.query.quiz
        
        const scoreInfo = await User.updateOne({$and:[{username: user},{"quizScores.title": quizName}]}, {$max: {"quizScores.$.score": score}});
        const sortedScores = await User.aggregate([{$unwind: {path: "$quizScores"}}, {$match: {"quizScores.title": quizName}}, {$sort: {"quizScores.score": -1}}])
        console.log(sortedScores)
        res.send(scoreInfo);
    } catch (err) {
        console.log(err);
        res.status(400).json('Error' + err);
    }
});
    
module.exports = router;