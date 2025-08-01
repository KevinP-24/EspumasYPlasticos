const express = require('express');
const router = express.Router();

// 🔐 Middleware para validar token JWT
const verifyToken = require('../middleware/auth.middleware');

// 📤 Configuración de Multer con Cloudinary (para íconos)
const { upload } = require('../config/cloudinary');

// 🎯 Controlador de categorías
const controller = require('../controllers/categoria.controller');

// =====================
// 📂 Rutas públicas
// =====================

// Obtener todas las categorías simples (sin subcategorías)
router.get('/', controller.obtenerCategorias);

// Obtener árbol de categorías con subcategorías y conteo de productos
router.get('/con-subcategorias', controller.obtenerCategoriasConSubcategorias);

// ============================
// 🔒 Rutas protegidas (requiere token)
// ============================

// Crear categoría
router.post(
  '/',
  verifyToken,
  upload.single('imagen'),
  controller.crearCategoria 
);

// Actualizar nombre y opcionalmente reemplazar ícono
router.put(
  '/:id',
  verifyToken,
  upload.single('imagen'), // opcional en el frontend
  controller.actualizarCategoria
);

// Eliminar categoría (también elimina ícono de Cloudinary)
router.delete('/:id', verifyToken, controller.eliminarCategoria);

// Exportamos el router
module.exports = router;
