// Importo Joi para validar los datos de entrada
const Joi = require('joi');

// Defino el esquema de validación para los usuarios
const userSchema = Joi.object({
    /*
    Valido que el nickname sea una cadena de texto entre 3 y 20 caracteres y que sea obligatorio 
    con mensajes personalizados para cada caso de error
    */
    nickname: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.empty": "El nickname no puede estar vacío",
            "string.min": "El nickname debe tener mínimo 3 caracteres",
            "string.max": "El nickname puede tener máximo 20 caracteres",
            "any.required": "El nickname es obligatorio"
        }),
});

// Exporto el esquema para usarlo en los controladores
module.exports = { userSchema };