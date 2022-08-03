const router = require('express').Router();
let User = require("../models/user.models");
var ObjectId = require('mongodb').ObjectId; 


router.route('/').post( async (req,res) => {
    try {
        const newUser = User(req.body.user);
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
        const users = await User.find();
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
    
module.exports = router;