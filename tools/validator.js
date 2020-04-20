const Joi = require('@hapi/joi')


//user Sign up validation

const ValidateSP = (body) => {
    
    const UserValidation = Joi.object({
        Full_Name : Joi.string().min(5).required().alphanum() ,
        Email : Joi.string().min(5).required().email() ,
        Password : Joi.string().min(4).required(),
        Username : Joi.string().min(5).required().alphanum(),
        Phone : Joi.string().min(5).required(),
    })
    const {error} = UserValidation.validate(body)
    const msg = (error) ? error.details[0].message : null
    return {error,msg}
}

module.exports.ValidateSP = ValidateSP