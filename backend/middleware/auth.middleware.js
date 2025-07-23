// 🔐 Middleware para verificar JWT en rutas protegidas
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // ✅ Obtenemos la cabecera Authorization: "Bearer <token>"
  const authHeader = req.headers['authorization'];

  // 🛑 Si no se envía el header Authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // ✅ Extraemos el token (eliminamos el prefijo "Bearer")
  const tokenParts = authHeader.split(' ');

  // 🔎 Validamos el formato "Bearer <token>"
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(400).json({ error: 'Formato de token inválido' });
  }

  const token = tokenParts[1];

  // 🔐 Verificamos y decodificamos el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // 🛑 Token inválido o expirado
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }

    // ✅ Token válido → Guardamos los datos del usuario en req
    req.user = decoded;

    // ✅ Continuamos con la siguiente función del middleware
    next();
  });
};

// 🚀 Exportamos el middleware
module.exports = verifyToken;
