const express = require('express');
const { User } = require('../models/User');
const { QuizParticipation } = require('../models/QuizParticipation');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', async (req, res) => {
    //TODO Validate with Joi
    const user = new User({ name: req.body.name })
    await user.save()
    const auth_token = jwt.sign(user.getAuthTokenPayload(), config.get('jwt_private_key'));
    res.header('x-auth-token', auth_token).send(user);
})

router.get('/me', auth.user, async (req, res) => {
    res.send(req.user);
})

module.exports = router;