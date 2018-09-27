const express = require('express');
const { QuizParticipation } = require('../models/QuizParticipation');

const router = express.Router();

router.get('/me', async (req, res) => {
    res.send(await QuizParticipation.find());
})

module.exports = router;