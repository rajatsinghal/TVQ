const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.static(__dirname+'/../public'));
router.use('/api/users', require('./users'));
router.use('/api/quizParticipation', require('./quizParticipation'));
router.get('/', (req, res) => res.send("Welcome to TVQ api!!") );

module.exports = router;
