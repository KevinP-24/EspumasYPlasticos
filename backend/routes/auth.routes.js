// ✅ Importación de dependencias
const express = require('express');
const router = express.Router();

// ✅ Importación del controlador que gestiona la lógica de autenticación
const controller = require('../controllers/auth.controller');

// ======================
// 🔐 Rutas de Autenticación
// ======================

// 🟢 Login de usuario (inicio de sesión)
router.post('/login', controller.login);

// 🟢 Registro de nuevo usuario
router.post('/register', controller.register); // ← Define esta función en el controlador si aún no existe

// 🔴 Logout del usuario (opcional, si manejas tokens en frontend)
router.post('/logout', controller.logout); // ← Puedes dejarlo vacío si no invalidas el JWT

// 🔁 Refrescar token (si implementas refresh tokens)
router.post('/refresh-token', controller.refreshToken); // ← Implementar según necesidad

// ✅ Exportación del router para usar con nombre descriptivo
module.exports = router;
