# Feedback del Trabajo Práctico

## Integrantes

Integrantes identificados a partir de los commits del repositorio:

- **Juan Manuel Solís Díaz**
- **Caro** (`carogn`)
- **Agustina** (`agustina505`)

> Se observa trabajo repartido entre los tres integrantes. 👏

---

## Resumen General

¡Buen trabajo! 🎉 El proyecto resuelve el MVP de `ENUNCIADO.md` con una arquitectura en capas ordenada (controllers / models / middlewares / routes / schemas), las cinco entidades con sus relaciones, el CRUD completo de cada una, y la regla de negocio de los comentarios aplicada correctamente en la visualización de los posts.

Se nota cuidado en la prolijidad: hay comentarios explicativos en el código, **middlewares genéricos reutilizables**, validación de integridad referencial al crear comentarios, y documentación (Swagger en YAML + colección de Postman). El principal punto a pulir es hacer **configurable por entorno** la ventana de meses, que hoy está fija en el código.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras + middlewares genéricos. |
| Modelado        |   ✅   | Relaciones completas; `nickname` y `email` únicos. |
| Validaciones    |   ✅   | Joi con mensajes propios + chequeo de FKs en comentarios. |
| Middlewares     |   ✅   | `validaExiste(Model)` y `schemaValidator(schema)` genéricos. |
| API REST        |   ✅   | CRUD completo + tags al crear post + imágenes. |
| Configuración   |   ⚠️   | La ventana de meses está fija en el código (Obs. 1). |
| Documentación   |   ✅   | Swagger (YAML), colección de Postman y notas del equipo. |

---

## Fortalezas

### 1. Regla de comentarios antiguos bien aplicada ⏳
**Ubicación:** `src/controllers/postController.js` (`getPosts`, `getPostById`)

Al traer los posts, los comentarios se filtran por visibilidad y antigüedad:

```js
const fechaLimite = new Date();
fechaLimite.setMonth(fechaLimite.getMonth() - mesesVisibles);
// include: [{ association: "comments", where: { visible: true, commentDate: { [Op.gte]: fechaLimite } }, required: false }]
```

Combinan un flag `visible` con el filtro por fecha, y lo aplican **solo en la vista de posts**, que es justo lo que pide el enunciado. 👌 (El único ajuste es que el “6” salga de una variable de entorno — ver Observación 1.)

### 2. Middlewares genéricos reutilizables ♻️
**Ubicación:** `src/middlewares/existe.middleware.js`, `src/middlewares/validateSchema.js`

`validaExisteMiddleware(Model)` valida la existencia de un registro para **cualquier** modelo (y lo deja en `req.record` para reusarlo en el controlador), `validaPathParameterMiddleware` valida que el id sea numérico, y `schemaValidator(schema)` centraliza la validación con Joi. Es el patrón que la materia valora, y se ve muy bien aplicado en `postImageRoutes`.

### 3. Validación de integridad referencial 🛡️
**Ubicación:** `src/controllers/commentController.js` (`createComment`)

Antes de crear un comentario verifican que el post y el usuario existan, devolviendo `404` con un mensaje claro si no. Es una buena práctica que evita comentarios “huérfanos”.

### 4. Modelado completo con claves únicas 🗃️
**Ubicación:** `src/db/models/`

Están todas las relaciones: 1:N (User→Post, User→Comment, Post→Comment, Post→PostImage) y N:M (Post↔Tag a través de `PostTags`). Además, definieron **`nickname` y `email` como únicos** en `User`, cumpliendo el requisito de clave única.

### 5. Documentación y material de prueba 📚
**Ubicación:** `docs/swagger.yaml`, `postmanPruebas/`, `somoLoqueSomo.md`

Incluyeron la documentación en formato Swagger YAML, una colección de JSON de prueba por entidad y notas del equipo. Buena cobertura del requisito de documentación.

---

## Observaciones

### 1. La antigüedad de los comentarios (X meses) está fija en el código

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/controllers/postController.js`

**Descripción:**
El umbral de meses está hardcodeado como constante:

```js
const mesesVisibles = 6;
```

El enunciado pide que ese valor sea **configurable mediante variables de entorno**. La parte más importante (el filtrado por fecha en la vista de posts) ya está bien resuelta; solo falta que el número venga del entorno. Además, hoy el valor está repetido en `getPosts` y en `getPostById`.

**Impacto:**
Cambiar la ventana de visibilidad obliga a tocar el código (y en dos lugares). Ya usan `dotenv` y leen otras variables (`PORT`, `DB_STORAGE`), así que el camino está abierto.

**Recomendación:**
Leer el valor del entorno una sola vez y reutilizarlo:

```js
const mesesVisibles = Number(process.env.COMMENT_VISIBLE_MONTHS ?? 6);
```

Conviene además sumarlo a un `.env.example` para documentar la variable.

---

### 2. Las etiquetas solo se pueden asociar al crear el post

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/controllers/postController.js` (`createPost`), `src/routes/tagRoutes.js`

**Descripción:**
La asociación Post↔Tag está bien resuelta **al crear** el post (`newPost.setTags(tagIds)`, y el `postSchema` ya acepta `tagIds`). Sin embargo, no hay un endpoint para **agregar o quitar tags a un post existente**; las rutas de tags son solo el CRUD de la entidad Tag.

**Impacto:**
Es una funcionalidad de gestión de relaciones que queda incompleta: una vez creado el post, no se puede modificar su conjunto de etiquetas. (Las imágenes, en cambio, sí se pueden agregar/eliminar después.)

**Recomendación:**
Agregar rutas como `POST /posts/:id/tags` y `DELETE /posts/:id/tags/:tagId` que usen `post.addTags(...)` / `post.removeTag(...)`.

---

### 3. Configuración de base de datos duplicada

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/db/database.js` vs `src/db/config/config.js`

**Descripción:**
Hay dos definiciones de la conexión: `database.js` crea la instancia de Sequelize con el `storage` **fijo** (`"./src/db/database.sqlite"`), y `config/config.js` arma una configuración que **sí** lee `DB_STORAGE` del entorno. Pero como `models/index.js` usa `database.js`, la configuración basada en entorno de `config.js` no llega a aplicarse.

**Impacto:**
El `.env` para la base no tiene efecto real, y conviven dos fuentes de verdad para lo mismo, lo que puede confundir. (Detalle relacionado: `validaExisteMiddleware` se aplica en las rutas de imágenes pero no en las de posts/comentarios/tags; unificarlo dejaría el manejo de “no encontrado” más consistente.)

**Recomendación:**
Dejar una única configuración: que `database.js` construya la instancia a partir de `config.js` (y por ende del `.env`), eliminando el `storage` hardcodeado.

---

## Conclusión

Es una entrega sólida y prolija, que cumple con el MVP y muestra buenas prácticas: middlewares genéricos, validación de integridad referencial, claves únicas y documentación completa. Se nota además la intención de dejar el código explicado y ordenado. 🌟

Los ajustes son acotados: llevar la ventana de meses a una variable de entorno (lo principal), permitir modificar los tags de un post ya creado, y unificar la configuración de la base. Con eso el trabajo queda muy redondo. ¡Felicitaciones por el esfuerzo del equipo! 🚀
