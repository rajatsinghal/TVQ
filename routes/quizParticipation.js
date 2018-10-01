const express = require('express');
const mongoose = require('mongoose');

const { User } = require('../models/User');
const { Quiz } = require('../models/Quiz');
const { QuizParticipation } = require('../models/QuizParticipation');
const auth = require('../middlewares/auth');
const loadModel = require('../middlewares/loadModel');

const router = express.Router();

router.post('/', [auth.user, loadModel('quiz_id', Quiz)], async (req, res) => {
    const user = await User.findById(req.user._id);

    if(req.body.requested_model.status != "SCHEDULED")
        return res.status(400).send("Oops, too late! The quiz has already started..");
    const existing_participation = await QuizParticipation.findOne({ 'user._id': user._id, 'quiz._id': req.body.requested_model._id });
    if(existing_participation)
        return res.status(400).send("You've already joined this quiz!");

    const participaton = new QuizParticipation({ user: user, quiz: req.body.requested_model });
    participaton.save();
    res.send(participaton);
})

module.exports = router;