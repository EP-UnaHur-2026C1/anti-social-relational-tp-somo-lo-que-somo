// Importo los modelos necesarios para manejar los comentarios
const { Comment, Post, User } = require("../db/models");

// Función para obtener todos los comentarios con su post y usuario asociado
const getComments = async (req, res) => {
    const comments = await Comment.findAll({
        include: [
            {
                model: Post,
                as: "post"
            },
            {
                model: User,
                as: "user"
            }
        ]
    });
    res.json(comments);
};

// Función para crear un nuevo comentario
const createComment = async (req, res) => {
    const { text, postId, userId } = req.body;

    // Valido que el post y user existan antes de crear el comentario
    const post = await Post.findByPk(postId);
    if (!post) {
        return res.status(404).json({
            message: "Post no encontrado"
        });
    }
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }
    // Creo el comentario
    const newComment = await Comment.create({
        text,
        postId,
        userId,
        commentDate: new Date(),
        visible: true
    });
    res.json(newComment);
};

// Función para actualizar un comentario
const updateComment = async (req, res) => {
    // Extraigo el id del comentario que se va a actualizar y el nuevo texto del body
    const { id } = req.params;
    const { text } = req.body;
    const comment = await Comment.findByPk(id);
    // Si el comentario no existe devuelvo un error
    if (!comment) {
        return res.status(404).json({
            message: "Comentario no encontrado"
        });
    }
    // Actualizo el texto del comentario y guardo los cambios
    comment.text = text;
    await comment.save();
    res.json(comment);
};

// Función para eliminar un comentario
const deleteComment = async (req, res) => {
    // Extraigo el id del comentario a eliminar
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    // Si el comentario no existe devuelvo un error
    if (!comment) {
        return res.status(404).json({
            message: "Comentario no encontrado"
        });
    }
    // Elimino el comentario de la base de datos
    await comment.destroy();
    res.json({
        message: "Comentario eliminado"
    });
};

//Exporo funciones para usar en rutas
module.exports = { getComments, createComment, updateComment, deleteComment };