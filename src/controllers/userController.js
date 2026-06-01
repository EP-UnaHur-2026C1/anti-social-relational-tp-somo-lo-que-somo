// Importo el modelo de User para usarlo en los controladores
import { User } from "../models/index.js";

//ARME ESTRUCTURA PERO AUN NO PROBRE ENDPOINTS, FALTA PROBAR Y VER SI FUNCIONA BIEN


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuarios",
            error: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuario",
            error: error.message,
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const { nickName, email } = req.body;

        const existingUser = await User.findOne({
            where: { nickName },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "El nickName ya existe",
            });
        }

        const newUser = await User.create({
            nickName,
            email,
        });

        res.status(201).json({
            message: "Usuario creado correctamente",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear usuario",
            error: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nickName, email } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        await user.update({
            nickName,
            email,
        });

        res.status(200).json({
            message: "Usuario actualizado correctamente",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar usuario",
            error: error.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        await user.destroy();

        res.status(200).json({
            message: "Usuario eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar usuario",
            error: error.message,
        });
    }
};