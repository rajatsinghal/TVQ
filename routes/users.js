const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const auth = require('../middlewares/auth');
const { User } = require('../models/User');
const { Quiz } = require('../models/Quiz');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = Joi.validate(req.body, {
        name: Joi.string().required().min(3)
    });
    if(error) return res.status(400).send(error.details[0].message);

    const user = new User({ name: req.body.name })
    await user.save()
    const auth_token = jwt.sign(user.getAuthTokenPayload(), config.get('jwt_private_key'));
    res.header('x-auth-token', auth_token).send(user);
})

router.get('/me', auth.user, async (req, res) => {
    const upcoming_quizzes = await Quiz.find({ ...Quiz.filter_upcoming() }).sort('start_time').limit(10).select('-__v -show.__v -show.channel.__v');
    res.send(upcoming_quizzes);
})

module.exports = router;