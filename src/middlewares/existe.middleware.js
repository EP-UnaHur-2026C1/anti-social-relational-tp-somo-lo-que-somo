// Middleware para validar que el parametro pasado por params sea un numero
const validaPathParameterMiddleware = (req, res, next) => {
    const id = req.params.id
    if (isNaN(id)) {
        return res.status(400).json({ message: 'El parametro debe ser numerico.' })
    }
    next()
}

// Middleware para validar que el id pasado por params exista en la base de datos
const validaExisteMiddleware = (Modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const record = await Modelo.findByPk(id);

        if (!record) {
            return res.status(404).json({
                message: `El id ${id} en el modelo ${Modelo.name} no existe`
            });
        }
        // Si el registro existe, lo guardo en req.record para que esté disponible en el controlador
        req.record = record;
        // Continúo con la ejecución del siguiente middleware o controlador
        next();
    };
};
// Exporto los middlewares para usarlos en las rutas
module.exports = { validaPathParameterMiddleware, validaExisteMiddleware };