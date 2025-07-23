const express = require('express');
const router = express.Router();

// 🔐 Middleware para proteger rutas (JWT)
const verifyToken = require('../middleware/auth.middleware');

// 🎯 Controlador de subcategorías
const controller = require('../controllers/subcategoria.controller');

// =====================
// 📂 Ruta pública
// =====================

// Obtener todas las subcategorías con su categoría asociada
router.get('/', controller.obtenerSubcategorias);

// ============================
// 🔒 Rutas protegidas (admin)
// ============================

// Crear una nueva subcategoría
router.post('/', verifyToken, controller.crearSubcategoria);

// Actualizar una subcategoría existente
router.put('/:id', verifyToken, controller.actualizarSubcategoria);

// Eliminar una subcategoría
router.delete('/:id', verifyToken, controller.eliminarSubcategoria);

// Exportar el router
module.exports = router;
