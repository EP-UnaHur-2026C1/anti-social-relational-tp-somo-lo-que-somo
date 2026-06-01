// Importo los modelos necesarios para las operaciones de postImage
import { PostImage, Post } from "../models/index.js";


//ARME ESTRUCTURA PERO AUN NO PROBRE ENDPOINTS, FALTA PROBAR Y VER SI FUNCIONA BIEN

export const getAllPostImages = async (req, res) => {
    try {
        const images = await PostImage.findAll({
            include: Post,
        });

        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener imágenes",
            error: error.message,
        });
    }
};

export const getPostImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await PostImage.findByPk(id, {
            include: Post,
        });

        if (!image) {
            return res.status(404).json({
                message: "Imagen no encontrada",
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

export const createPostImage = async (req, res) => {
    try {
        const { imageUrl, postId } = req.body;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({
                message: "El post asociado no existe",
            });
        }

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

export const updatePostImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageUrl } = req.body;
        const image = await PostImage.findByPk(id);

        if (!image) {
            return res.status(404).json({
                message: "Imagen no encontrada",
            });
        }
        await image.update({
            imageUrl,
        });

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

export const deletePostImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await PostImage.findByPk(id);
        if (!image) {
            return res.status(404).json({
                message: "Imagen no encontrada",
            });
        }

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