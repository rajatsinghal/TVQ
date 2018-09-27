const express = require('express');
const { User } = require('../models/User');
const { QuizParticipation } = require('../models/QuizParticipation');

const router = express.Router();

router.post('/', async (req, res) => {
    //TODO Validate with Joi
    const user = new User({ name: req.body.name })
    res.send(await user.save());
})

router.get('/me', async (req, res) => {
    res.send(await QuizParticipation.find());
})

module.exports = router;