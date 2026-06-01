// Importo el modelo de User para usarlo en los controladores
const { User } = require("../db/models");

//ARME ESTRUCTURA PERO AUN NO PROBRE ENDPOINTS, FALTA PROBAR Y VER SI FUNCIONA BIEN
const getAllUsers = async (req, res) => {
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

const getUserById = async (req, res) => {
    try {
        const user = req.record;

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuario",
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { nickname, email } = req.body;

        const existingUser = await User.findOne({
            where: { nickname },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "El nickname ya existe",
            });
        }

        const newUser = await User.create({
            nickname,
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

const updateUser = async (req, res) => {
    try {
        const { nickname, email } = req.body;
        const user = req.record;

        await user.update({
            nickname,
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

const deleteUser = async (req, res) => {
    try {
        const user = req.record;
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

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}