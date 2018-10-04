const mongoose = require('mongoose')

module.exports = (req_obj_name, variable_name, Model) => {
    return async (req, res, next) => {
        const req_obj = req[req_obj_name]; //req_obj_name in [body, params, query, headers, cookies]
        if(!req_obj[variable_name] || !mongoose.Types.ObjectId.isValid(req_obj[variable_name]))
            return res.status(400).send("Incorrect or incomplete information!");
        const requested_model = await Model.findById(req_obj[variable_name]);
        if(!requested_model)
            return res.status(400).send("Incorrect or incomplete information!!");
        
        (req.requested_models || (req.requested_models = {}))[requested_model.collection.name] = requested_model;
        next();
    };
}