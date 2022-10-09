const router = require('express').Router();
var ObjectId = require('mongodb').ObjectId; 
let Timer = require("../models/timer.models");
let User = require("../models/user.models");

router.route('/timer')
.post( async (req, res) => {
    const title = req.body.title;
    const step =  {
        stepName: ""
    }
    const newTimer = new Timer({
        title: title, 
        process: [step]
    });
    await newTimer.save();
    res.send("valid request")
}).get(async (req,res) => {
    const val = await Timer.find();;
    res.send(val);
}).delete( async (req, res) => {
    await Timer.deleteOne({_id: new ObjectId(req.body._id)});
    res.send("valid request");
});

router.route('/step')
.get(async (req, res) => {
        //get process
    const process = await Timer.findById({_id: req.query._id});
    console.log(process)
    console.log(req.query._id);
    res.send(process.process)
})
.post( async (req, res) => {
    //add  a step
    console.log(req.body._id);
    const process = await Timer.updateOne({_id: req.body._id}, {$push: {process: {stepName: ""}}});
    res.send("valid request")
}).put(async (req, res) => {
        //update a step 
    const _id = req.body._id;
    const step = req.body.text
    const val = await Timer.updateOne({'process._id': _id},{$set: {"process.$.stepName": step}});
    res.send("connected to backend")

}).delete( async (req, res) => {
    const timerId = new ObjectId(req.body.timerId);
    const _id = new ObjectId(req.body._id);
    const val = await Timer.updateOne({_id: timerId}, {$pull : {process: {_id: _id}}});
    console.log(val);
    res.send("connected to backend")
})

module.exports = router;