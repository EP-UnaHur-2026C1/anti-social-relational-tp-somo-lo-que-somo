## Diagrama de la base de datos

![DB Diagram](./assets/der.png)


# Configuración inicial del proyecto

## Instalación de dependencias

### Instalación de Express
```bash
npm i express
```

Framework utilizado para la creación del servidor y manejo de rutas HTTP.

---

### Instalación de Sequelize ORM
```bash
npm i sequelize
```

ORM utilizado para trabajar con bases de datos relacionales mediante modelos y consultas desde JavaScript.

---

### Instalación de SQLite
```bash
npm i sqlite3
```

Motor de base de datos SQLite utilizado para desarrollo y pruebas locales.

---

### Instalación de dependencias de desarrollo
```bash
npm i -D sequelize-cli nodemon
```

- `sequelize-cli`: herramienta de línea de comandos para generar configuraciones, modelos, migraciones y seeders.
- `nodemon`: reinicia automáticamente el servidor al detectar cambios en el proyecto.

---

# Inicialización de Sequelize

```bash
npx sequelize-cli init
```

Este comando genera automáticamente las carpetas:

- `config/`
- `models/`
- `migrations/`
- `seeders/`

Posteriormente, estas carpetas fueron reorganizadas dentro de `src/db/` para mantener una estructura modular y ordenada.

---

# Estructura del proyecto

```plaintext
ANTI-SOCIAL-RELATIONAL-TP-SOMO-LO-...
│
├── assets/
├── node_modules/
│
├── src/
│   │
│   ├── controllers/
│   │
│   ├── db/
│   │   ├── config/
│   │   ├── migrations/
│   │   ├── models/
│   │   └── seeders/
│   │
│   ├── middlewares/
│   ├── routes/
│   ├── schemas/
│   │
│   └── main.js
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

# Descripción de carpetas

## `assets/`
Contiene archivos estáticos del proyecto como imágenes, íconos o recursos visuales.

---

## `src/controllers/`
Contiene la lógica de control de las peticiones y respuestas HTTP.

---

## `src/db/`
Carpeta principal relacionada con la base de datos.

### `config/`
Configuración de conexión de Sequelize.

### `migrations/`
Archivos encargados de versionar cambios en la estructura de la base de datos.

### `models/`
Definición de modelos Sequelize y relaciones entre tablas.

### `seeders/`
Datos iniciales o de prueba para poblar la base de datos.

---

## `src/middlewares/`
Middlewares personalizados para validaciones, autenticación y manejo de errores.

---

## `src/routes/`
Definición de rutas y endpoints de la aplicación.

---

## `src/schemas/`
Esquemas de validación de datos utilizados en formularios o endpoints.

---

## `src/main.js`
Archivo principal encargado de inicializar la aplicación.

---

# Objetivo de la estructura

La estructura del proyecto fue organizada de manera modular para:

- Separar responsabilidades.
- Facilitar el mantenimiento del código.
- Mejorar la escalabilidad del proyecto.
- Mantener una arquitectura más limpia y ordenada.
- Facilitar el trabajo colaborativo en equipo.