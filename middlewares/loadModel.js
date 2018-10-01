const mongoose = require('mongoose')

module.exports = (variable_name, Model) => {
    return async (req, res, next) => {
        if(!req.body[variable_name] || !mongoose.Types.ObjectId.isValid(req.body[variable_name]))
            return res.status(400).send("Incorrect or incomplete information!");
        const requested_model = await Model.findById(req.body[variable_name]);
        if(!requested_model)
            return res.status(400).send("Incorrect or incomplete information!!");
        
        (req.body.requested_models || (req.body.requested_models = {}))[requested_model.collection.name] = requested_model;
        next();
    };
}