const router = require('express').Router();
let User = require("../models/user.models");
var ObjectId = require('mongodb').ObjectId; 
const session = require('express-session');
const passport = require('passport');
LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
//you can catch errors with express next() functions
router.route('/login').post( (req,res, next) => {
    console.log(req.body);

    const newUser = User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(newUser, (err)=> {
        if (err) {
            return next(err);
        } else {
            passport.authenticate("local", (err, user, info)=>  {
                console.log(user)
                if (err) {
                    return next(err)
                }
                if (!user) {
                    res.send(false);
                } else {
                    console.log("user autheticated!")
                    res.send(true)
                }
            })(req,res, ()=> {
            })
        }
    });
   });
//need to add error catching
    router.route('/').post( async (req,res) => {
        const newUser = User({
            username: req.body.username,
            email: req.body.email
        });

        User.register(newUser, req.body.password, (err, user)=> {
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, () =>{
                    console.log(req);
                    res.send(true);
                    console.log("new user added!")
                })
            }
        })
    });
router.route('/verify').get( (req,res)=> {
    console.log("this is the verification route.");
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.send("connected to verification")

})
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
    
module.exports = router;