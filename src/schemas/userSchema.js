const Joi = require('joi')

const userSchema = Joi.object({
    nickname: Joi.string().min(1).max(20).required().messages({
        "string.empty": "El user no puede estar vacio",
        "string.min": "El user debe tener minimo 1 caracter",
        "string.max": "El user puede tener maximo 20 caracteres"
    }),

});

module.exports = {userSchema};