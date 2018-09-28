const mongoose = require('mongoose');
const { show_schema } = require("./Show");

const question_schema = new mongoose.Schema({
    'title': String, 
    'op1': String, 'op2': String, 'op3': String, 'op4': String,
    'correct_choice': String,
    'start_time': Date, 'end_time': Date
});
const quiz_schema = new mongoose.Schema({
    'show': { type: show_schema, required: true },
    'start_time': Date,
    'status': String,
    'price_pool': Number,
    'questions': [question_schema],
});

class Quiz extends mongoose.model('Quiz', quiz_schema) {
    
}

module.exports = { question_schema, quiz_schema, Quiz };