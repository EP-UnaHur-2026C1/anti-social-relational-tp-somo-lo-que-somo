const { Post } = require('../db/models')
const {validarById} = require('./generic.middleware')
const postSchema = require("../schemas/postSchema")
const genericSchemaValidator = require("../schemas/genericSchemaValidator")

const validarPostById = validarById(Post);

const validarSchemaPost = (req, res, next) =>{
    const {error, value} = genericSchemaValidator(postSchema, req.body);
    if (error){
        res.status(400).json(error.details.map(e=>{
            return{
                atributo: e.path[0],
                detalle: e.message
            };
        }),
    );
    return;
    }
    next();
}

module.exports = {validarPostById, validarSchemaPost};
