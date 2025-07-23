const express = require('express');
const router = express.Router();

// 🔐 Middleware para verificar JWT del usuario
const verifyToken = require('../middleware/auth.middleware');

// 📤 Multer configurado con Cloudinary para subir imágenes
const { upload } = require('../config/cloudinary');

// 🎯 Controlador de lógica de productos
const controller = require('../controllers/producto.controller');

// =====================
// 📦 Rutas públicas
// =====================

// Obtener todos los productos con sus imágenes
router.get('/', controller.obtenerProductos);

// Obtener un producto individual con todas sus imágenes
router.get('/:id', controller.obtenerProductoPorId);

// ============================
// 🔒 Rutas protegidas con JWT
// 📷 Imágenes vía FormData
// ============================

// Crear producto con hasta 5 imágenes (campo: imagenes[])
router.post(
  '/',
  verifyToken,
  upload.array('imagenes', 5),
  controller.crearProductoDesdeRuta
);

// Actualizar producto y reemplazar imágenes completamente si se suben nuevas
router.put(
  '/:id',
  verifyToken,
  upload.array('imagenes', 5),
  controller.actualizarProducto
);

// Eliminar producto y todas sus imágenes asociadas
router.delete('/:id', verifyToken, controller.eliminarProducto);

// 📤 Exportación del router
module.exports = router;
