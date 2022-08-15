require("dotenv").config();
const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

///passport.js for cookies, sessions, and auth
const session = require('express-session');
const passportLocalMongoose = require("passport-local-mongoose")
const passport = require('passport');
LocalStrategy = require('passport-local').Strategy;


//salting and hashing passwords
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());


////////CONNECTING TO MONGODB & MONGOOSE
// need to add uri to environment varibales. 
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!")
});
////////////I still need to close mongoDB somewhere...

const User = require("./models/user.models");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())





///Router for the root path
const userRouter = require(__dirname + '/routes/users');
app.use('/', userRouter);
////

const quizRouter = require(__dirname + '/routes/quizzes');
app.use('/', quizRouter);

const adminRouter = require(__dirname + '/routes/admin');
app.use('/', adminRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

