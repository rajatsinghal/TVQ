const express = require('express');
const mongoose = require('mongoose');

const { User } = require('../models/User');
const { Quiz } = require('../models/Quiz');
const { QuizParticipant } = require('../models/QuizParticipant');
const auth = require('../middlewares/auth');
const loadModel = require('../middlewares/loadModel');

const router = express.Router();

router.post('/', [auth.user, loadModel('quiz_id', Quiz)], async (req, res) => {
    const user = await User.findById(req.user._id);
    const requested_quiz = req.body.requested_models[Quiz.collection.name];

    if(requested_quiz.status != "SCHEDULED")
        return res.status(400).send("Oops, too late! The quiz has already started..");
    const existing_participant = await QuizParticipant.findOne({ 'user._id': user._id, 'quiz._id': requested_quiz._id });
    if(existing_participant)
        return res.status(400).send("You've already joined this quiz!");
    // Add validatation - only allowed in [-3,0] minutes window of quiz.start_time

    const participaton = new QuizParticipant({ user: user, quiz: requested_quiz });
    participaton.save();
    res.send(participaton);
})

router.post('/submitAnswer', [auth.user, loadModel('quiz_participant_id', QuizParticipant)], async (req, res) => {
    const quiz_participant = req.body.requested_models[QuizParticipant.collection.name]
    if(!req.body.question_id || !mongoose.Types.ObjectId.isValid(req.body.question_id))
        return res.status(400).send("Incorrect or incomplete information!");
    const question = quiz_participant.quiz.questions.id(req.body.question_id);
    if(!question)
        return res.status(400).send("Incorrect or incomplete information!");
    if(question.end_time < new Date())
        return res.status(400).send("Too Late!");
    if(question.is_correct !== null)
        return res.status(400).send("Already answered!");
    
    if(!req.body.selected_option || !['op1', 'op2', 'op3', 'op4'].includes(req.body.selected_option))
        return res.status(400).send("Please send valid answer!");
    
    question.is_correct = question.correct_choice == req.body.selected_option;
    quiz_participant.save();
})

module.exports = router;