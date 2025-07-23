// 📦 Importamos las librerías necesarias
const cloudinary = require('cloudinary').v2; // SDK oficial de Cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Adaptador Multer para Cloudinary
const multer = require('multer'); // Middleware para manejo de multipart/form-data
require('dotenv').config(); // Carga variables de entorno desde .env

// ✅ Configuración de Cloudinary con variables del entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,     // Nombre de tu cuenta Cloudinary o empresa 
  api_key: process.env.CLOUDINARY_API_KEY,           // tu API Key de Cloudinary
  api_secret: process.env.CLOUDINARY_API_SECRET      // tu API Secret de Cloudinary
});

// 🗃️ Configuración de almacenamiento para Multer usando Cloudinary
const storage = new CloudinaryStorage({
  cloudinary, // instancia configurada de Cloudinary
  params: async (req, file) => ({
    folder: 'plaxtilineas_productos', // Carpeta donde se almacenarán las imágenes en Cloudinary
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}` // Nombre único basado en timestamp y nombre del archivo
  })
});

// 🛡️ Filtro de archivos: solo se permiten imágenes válidas
const fileFilter = (req, file, cb) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']; // Tipos MIME válidos
  if (validTypes.includes(file.mimetype)) {
    cb(null, true); // ✅ Aceptado
  } else {
    cb(new Error('Formato de imagen no permitido'), false); // ❌ Rechazado
  }
};

// 🎯 Instancia final de Multer configurada con almacenamiento y filtro
const upload = multer({ storage, fileFilter });

// 🚀 Exportamos para uso en rutas o controladores
module.exports = {
  cloudinary, // Para eliminar imágenes, acceder a URL, etc.
  storage,    // (Opcional) si necesitas acceso directo
  upload      // Lo usas con: upload.single('imagen') o upload.array('imagenes', n)
};
