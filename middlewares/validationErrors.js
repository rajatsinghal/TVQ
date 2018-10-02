const { validationResult } = require('express-validator/check');

module.exports = function(req, res, next) {
    const errors = validationResult(req);
    //TODO Write formatWith to send 1 error for 1 property
    //const errors = validationResult(req).formatWith((errors)=>console.log(errors));
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}