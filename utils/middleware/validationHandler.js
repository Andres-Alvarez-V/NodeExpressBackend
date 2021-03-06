const boom = require('@hapi/boom');
const joi = require('joi');





function validate(data, schema){
    // console.log(data)
    // console.log(schema)
    return joi.assert(data, schema);
}

function validationHandler(schema, check = 'body'){
    return function(req, res, next){
        const error = validate(req[check], schema);
        error ? next(boom.badRequest(error)) : next();
    }
}




module.exports = validationHandler; 