const mongoose = require('mongoose');
const { quiz_schema, question_schema } = require("./Quiz");

question_schema.add({ "is_correct": Boolean });
quiz_schema.remove("questions");
quiz_schema.add({"questions": [question_schema]});

const quiz_participant_schema = new mongoose.Schema({
    'user': new mongoose.Schema({ 'name': { type: String, required: true } }),
    'quiz': quiz_schema,
    'score': { type: Number, default: 0 }
});

class QuizParticipation extends mongoose.model('QuizParticipation', quiz_participant_schema) {

}

module.exports = { quiz_participant_schema, QuizParticipation };