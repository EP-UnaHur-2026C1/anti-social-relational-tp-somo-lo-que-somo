// Importo express, creo una app y me traigo la conexión a la base de datos
//importo dotenv para manejar variables de entorno
require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db/database");
const PORT = process.env.PORT || 3000;
// IMPORTAR Ini
const { seedDatabase } = require("./ini.js");

// Middleware para parsear JSON
app.use(express.json());

// Rutas
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const tagRoutes = require("./routes/tagRoutes");
const userRoutes = require("./routes/userRoutes");
const postImageRoutes = require("./routes/postImageRoutes");

// Mount de rutas
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/tags", tagRoutes);
app.use("/users", userRoutes);
app.use("/post-images", postImageRoutes);


const startServer = async () => {
    try {
        await sequelize.sync({ force: true });
        //descomentando la linea de abajo para resetear la base de datos e inicializarla con datos de prueba cada vez que se inicia el server
        //await seedDatabase();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar server:", error);
    }
};

startServer();