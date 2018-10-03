const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body } = require('express-validator/check'); 

const auth = require('../middlewares/auth');
const { User } = require('../models/User');
const { Quiz } = require('../models/Quiz');

const router = express.Router();

router.post('/', [ 
    body('name', 'Please provide valid name!').isString().exists().isLength({ min: 3 }),
    require('../middlewares/validationErrors')
], async (req, res) => {
    const user = new User({ name: req.body.name })
    await user.save()
    const auth_token = jwt.sign(user.getAuthTokenPayload(), config.get('jwt_private_key'));
    res.header('x-auth-token', auth_token).send(user);
})

router.get('/me', auth.user, async (req, res) => {
    const upcoming_quizzes = await Quiz.find().upcoming().sort('start_time').limit(10).select('-__v -show.__v -show.channel.__v');
    res.send(upcoming_quizzes);
})

module.exports = router;