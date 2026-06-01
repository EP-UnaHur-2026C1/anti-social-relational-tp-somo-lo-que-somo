// Middleware para validar que el parametro pasado por params sea un numero
const validaPathParameterMiddleware = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "ID no enviado"
        });
    }

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            message: "El parámetro debe ser numérico"
        });
    }

    next();
};

// Middleware para validar que el id pasado por params exista en la base de datos
const validaExisteMiddleware = (Model) => {
    return async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: "ID no enviado"
                });
            }

            const record = await Model.findByPk(id);

            if (!record) {
                return res.status(404).json({
                    message: `El id ${id} no existe en el modelo ${Model.name}`
                });
            }

            req.record = record;

            next();

        } catch (error) {
            res.status(500).json({
                message: "Error en validación de existencia",
                error: error.message
            });
        }
    };
};
// Exporto los middlewares para usarlos en las rutas
module.exports = { validaPathParameterMiddleware, validaExisteMiddleware };