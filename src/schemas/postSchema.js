const Joi = require('joi')

const postSchema = Joi.object({

    description: Joi.string().min(3).max(100).required().messages({
        "string.empty": "La descripcion no puede estar vacia",
        "string.min": "La descripcion tiene que tener al menos 3 caracteres",
        "string.max": "La descripcion tiene que tener maximo 100 caracteres",
        "any.required": "Tiene que tener una descripcion"
    }),
}
    
)

module.exports = {postSchema};