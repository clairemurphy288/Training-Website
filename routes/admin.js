const router = require('express').Router();
var ObjectId = require('mongodb').ObjectId; 
let {Quiz} = require("../models/quiz.models");
let User = require("../models/user.models");
//For now quizzes can only work as .txt files
router.route('/admin').post( async (req,res) => {
    try {
        const title = req.body[1];
        let quiz = req.body[0].fileContent;
        // console.log(JSON.stringify(quiz))
        quiz = quiz.replace(/\n/g, "").trim();
        quiz = quiz.split("\r");
        const questions = [];
        for (let i = 1; i < quiz.length; i++) {
            let line = quiz[i].trim().split("\t");
            //utilizing the question Schema
            let question = ({
                question: line[0],
                answerChoices: [line[1],line[2],line[3],line[4]],
                indexOfAnswer: Number(line[5]) -1
            });
            questions.push(question);
        }
        //quizSchema
        const newQuiz = new Quiz({
            name: title,
            questions: questions
        });
        //adds new quiz to database
        await newQuiz.save();
        res.send("new quiz added!!!!");
// Adding in the score object for each user associated to this quiz
        const ScoreObject = {title: title, score: 0}
        const users = await User.updateMany({}, {$push: {quizScores: ScoreObject}});
        
    } catch (err) {
        res.json('Error' + err);
    }
});
//get request for live quiz feed
router.route('/admin/quiz').get(async (req,res) => {
    
    const quiz = await Quiz.find();
    const quizTitles = []
    for(let i = 0; i < quiz.length; i++) {
        quizTitles.push(quiz[i].name);
    }
    res.send([quizTitles,quiz]);
});
//deletes a quiz from the database
router.route('/admin/quiz/delete').post(async (req,res) => {
    await Quiz.deleteOne({_id: new ObjectId(req.body._id)});
    
 
});
//this get the quiz based on the ID in the route params (should really be a get request :/)
router.route('/admin/edit').post(async (req,res) => {
    const id = new ObjectId(req.body.query);
    const quiz = await Quiz.find({_id: id});
    res.send(quiz);
});
//this will edit a specific question and it's answer choices
router.route('/admin/edit/quiz').post(async (req,res) => {
    const question = new ObjectId(req.body.id);
    await Quiz.updateOne({'questions._id':question }, {$set: 
        { 'questions.$.question' : req.body.question }});
    if (req.body.indexOfAnswer !== -1) {
        await Quiz.updateOne({'questions._id': question}, {$set: {'questions.$.indexOfAnswer': req.body.indexOfAnswer}});
    }
    if (req.body.data.length > 1) {
        await Quiz.updateOne({'questions._id': question}, {$set: {'questions.$.answerChoices': req.body.data}});
    }
    //need to figure out how to query for nested objects
    const quizId = new ObjectId(req.body.quizId);
   const quiz = await Quiz.find({_id:quizId});
  res.send(quiz);
});
//this route deletes a specific question
router.route('/admin/edit/question-delete').post(async (req,res) => {
    const quiz = new ObjectId(req.body.quizId)
    const questionForDeletion = new ObjectId(req.body.id);
    const delete1 = await Quiz.updateOne({_id: quiz}, {$pull: {
        questions: {_id: questionForDeletion}
    }});
    const newQuiz = await Quiz.find({_id:quiz});
    res.send(newQuiz);
});
//this searches the quiz for a specific question based on the admins query
router.route('/admin/quiz/query').post(async (req,res) => {
    const quizId = new ObjectId(req.body._id);
    const reg = new RegExp(req.body.search, 'i')
    // Fix this query
    const questions = await Quiz.aggregate([{$match: {_id: quizId}}, {$unwind:{path: '$questions'}},
    {$unwind:{path: '$questions.question'}}, {$match: {'questions.question': reg}}, {$project: {_id:0, name:0}}]);
    res.send(questions);
    
});
//this route adds a question to the quiz at index 0
router.route('/admin/add').post(async (req,res) => {
    const quiz = new ObjectId(req.body._id);
    const question = req.body.question;
    const value = await Quiz.updateOne({_id: quiz}, {$push:{questions: {$each: [req.body.question], $position:0}}});

    res.send("connected to backend");
});
//this creates a user by the admin (may be modified)
router.route('/admin/add-user').post(async (req,res) => {
    const user = new User(req.body.user);
    await user.save()
    res.send("connected to backend");
});

router.route('/admin/edit-title').post(async (req,res) => {
    await Quiz.updateOne({_id: new ObjectId(req.body.query)}, {$set: {name: req.body.name}})
    res.send("connected to backend");
});


module.exports = router;