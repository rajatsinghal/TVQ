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
    res.send(quiz_participant)
})

module.exports = router;