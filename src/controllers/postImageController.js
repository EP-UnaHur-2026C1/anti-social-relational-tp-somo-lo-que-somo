// Importo los modelos necesarios para las operaciones de postImage
const { PostImage, Post } = require("../db/models");

//ARME ESTRUCTURA PERO AUN NO PROBRE ENDPOINTS, FALTA PROBAR Y VER SI FUNCIONA BIEN
const getAllPostImages = async (req, res) => {
    try {
        const images = await PostImage.findAll({
            include: [
                {
                    model: Post,
                    as: "post"
                }
            ]
        });

        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener imágenes",
            error: error.message,
        });
    }
};



const getPostImageById = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await PostImage.findByPk(id, {
            include: {
                model: Post,
                as: "post"
            }
        });

        if (!image) {
            return res.status(404).json({
                message: "Imagen no encontrada"
            });
        }

        res.status(200).json(image);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener imagen",
            error: error.message,
        });
    }
};


const createPostImage = async (req, res) => {
    try {
        const { imageUrl, postId } = req.body;

        const newImage = await PostImage.create({
            imageUrl,
            postId,
        });

        res.status(201).json({
            message: "Imagen agregada correctamente",
            image: newImage,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear imagen",
            error: error.message,
        });
    }
};

const updatePostImage = async (req, res) => {
    try {
        const image = req.record;
        const { imageUrl } = req.body;

        await image.update({ imageUrl });

        res.status(200).json({
            message: "Imagen actualizada correctamente",
            image,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar imagen",
            error: error.message,
        });
    }
};

const deletePostImage = async (req, res) => {
    try {
        const image = req.record;

        await image.destroy();

        res.status(200).json({
            message: "Imagen eliminada correctamente",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar imagen",
            error: error.message,
        });
    }
};


module.exports = {
    getAllPostImages,
    getPostImageById,
    createPostImage,
    updatePostImage,
    deletePostImage
}