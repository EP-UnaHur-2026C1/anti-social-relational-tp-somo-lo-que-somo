const Joi = require('joi')

const commentSchema = Joi.object({

    text: Joi.string().min(1).max(50).required().messages({
        "string.empty": "El comentario no puede estar vacio",
        "string.min": "El comentario tiene que tener al menos 1 caracter",
        "string.max": "El comentario tiene que tener maximo 50 caracteres",
    }),
    postId: Joi.number().integer().required(),
}
    
);

module.exports = {commentSchema};