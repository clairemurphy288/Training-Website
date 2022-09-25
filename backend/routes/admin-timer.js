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
}).get(async (req,res) => {
    const val = await Timer.find();;
    res.send(val);
}).delete( async (req, res) => {
    await Timer.deleteOne({_id: new ObjectId(req.body._id)});
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
    console.log(process)
}).put(async (req, res) => {
    //update a step 

}).delete( async (req, res) => {
    //delete a step
})

module.exports = router;