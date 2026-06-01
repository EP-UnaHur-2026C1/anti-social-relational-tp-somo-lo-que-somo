// Importo el modelo de Post para interactuar con la base de datos
const { Post } = require("../db/models");

// Función para obtener todos los posts con sus asociaciones
const getPosts = async (req, res) => {
    // Incluyo asociaciones para los datos de las relaciones
    const posts = await Post.findAll({
        include: [
            {
                association: "user"
            },
            {
                association: "comments"
            },
            {
                association: "tags"
            },
            {
                association: "images"
            }
        ]
    });
    res.json(posts);
};

// Función para crear un nuevo post
const createPost = async (req, res) => {
    // Extraigo los datos necesarios del body de la solicitud
    const { description, tagIds, userId } = req.body;
    // Creo el nuevo post
    const newPost = await Post.create({
        description,
        userId
    });
    // Si se proporcionan tags, los asocio al post
    if (tagIds && tagIds.length > 0) {
        await newPost.setTags(tagIds);
    }
    res.json(newPost);
};

// Función para actualizar un post
const updatePost = async (req, res) => {
    // Extraigo el id del post que se va a actualizar y la nueva descripción del body
    const { id } = req.params;
    const { description } = req.body;

    // Busco el post por su id 
    const post = await Post.findByPk(id);
    if (!post) {
        return res.status(404).json({
            message: "Post no encontrado"
        });
    }
    // Actualizo la descripción del post y guardo los cambios
    post.description = description;
    await post.save();
    res.json(post);
};

// Función para eliminar un post
const deletePost = async (req, res) => {
    // Extraigo el id del post que a eliminar
    const { id } = req.params;
    const post = await Post.findByPk(id);
    // Si el post no existe devuelvo un error
    if (!post) {
        return res.status(404).json({
            message: "Post no encontrado"
        });
    }
    // Elimino el post de la base de datos 
    await post.destroy();
    res.json({
        message: "Post eliminado"
    });
};

module.exports = { getPosts, createPost, updatePost, deletePost };