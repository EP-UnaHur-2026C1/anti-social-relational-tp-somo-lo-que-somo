const Joi = require('joi')

const postSchema = Joi.object({
    id: Joi.integer().min(1).max().required().messages({
        "integer.empty": "El id no puede estar vacio",
        "integer.min": "El id no puede ser menor a 1",
        "integer.required": "El atributo id debe existir"
        }
    ),
    descripcion: Joi.string().min(3).max(100).required().messages({
        "string.empty": "La descripcion no puede estar vacia",
        "string.min": "La descripcion tiene que tener al menos 3 caracteres",
        "string.max": "La descripcion tiene que tener maximo 100 caracteres",
        "string.required": "Tiene que tener una descripcion"
    }),
}
    
)

module.exports = postSchema;