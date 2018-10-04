const express = require('express');
const mongoose = require('mongoose');
const { body, param } = require('express-validator/check');
const _ = require('lodash');

const { User } = require('../models/User');
const { Quiz } = require('../models/Quiz');
const { QuizParticipant } = require('../models/QuizParticipant');
const auth = require('../middlewares/auth');
const loadModel = require('../middlewares/loadModel');

const router = express.Router();

router.post('/', [
    auth.user, loadModel('body', 'quiz_id', Quiz)
], async (req, res) => {
    const user = await User.findById(req.user._id);
    const requested_quiz = req.requested_models[Quiz.collection.name];

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

router.get('/:id/question/:question_id', [
    auth.user,
    loadModel('params', 'id', QuizParticipant),
    param('question_id').exists().isMongoId(),
    require('../middlewares/validationErrors')
],async (req, res) => {
    const quiz_participant = req.requested_models[QuizParticipant.collection.name]
    const question = quiz_participant.quiz.questions.id(req.body.question_id);
    if(!question)
        return res.status(400).send("Incorrect or incomplete information!");
    if(question.start_time < new Date())
        return res.status(400).send("Too Late!");
    res.send(_.pick(question, ['title', 'op1', 'op2', 'op3', 'op4']));
})

router.post('/:id/question/:question_id/submitAnswer', [
    auth.user,
    loadModel('params', 'id', QuizParticipant),
    param('question_id').exists().isMongoId(),
    body('selected_option', "Please send valid answer!").exists().isIn(['op1', 'op2', 'op3', 'op4']),
    require('../middlewares/validationErrors')
], async (req, res) => {
    const quiz_participant = req.requested_models[QuizParticipant.collection.name]
    const question = quiz_participant.quiz.questions.id(req.body.question_id);
    if(!question)
        return res.status(400).send("Incorrect or incomplete information!");
    if(question.end_time < new Date())
        return res.status(400).send("Too Late!");
    if(question.is_correct !== null)
        return res.status(400).send("Already answered!");
    
    question.is_correct = question.correct_choice == req.body.selected_option;
    quiz_participant.save();
})

module.exports = router;