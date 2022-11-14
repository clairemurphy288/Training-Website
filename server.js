
require("dotenv").config();
const axios = require("axios");
const path = require("path")
const express = require('express');
//cors is some middleware still not sure what it does. 
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require("multer");
const Timer = require("./models/timer.models");
const app = express();
const fs = require("fs");
var ObjectId = require('mongodb').ObjectId; 
const port = process.env.PORT;
////not sure what this does
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());





////////CONNECTING TO MONGODB & MONGOOSE
// need to add uri to environment varibales. 
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!")
});


// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// cb(null, file.fieldname + '-' + uniqueSuffix)

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,"uploads")
//     },
//     filename: (req, file, cb) => {
//         // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         // cb(null, file.fieldname + '-' + uniqueSuffix)

//         cb(null, file.originalname)
//     }
// });

// const upload = multer({storage: storage});

app.get("/api/v1/image", (req,res) => {
    res.send("postman is working")
})

;

app.post("/api/v1/image/:_id", upload.single("testImage"), async (req,res) => {
    const _id = req.params._id;
const val = await Timer.updateOne({'process._id': new ObjectId(_id)},{$set: {"process.$.image":  { data: req.file.buffer,
contentType: "image/png"}}})
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')


});


///Router for the root path
const userRouter = require(__dirname + '/routes/users');
app.use('/api/v1', userRouter);
////

const quizRouter = require(__dirname + '/routes/quizzes');
app.use('/api/v1', quizRouter);

const adminRouter = require(__dirname + '/routes/admin');
app.use('/api/v1', adminRouter);

const adminTimerRouter = require(__dirname + '/routes/admin-timer');
app.use('/api/v1', adminTimerRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));

    });
} else {
    console.log("entering dev mode");
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

