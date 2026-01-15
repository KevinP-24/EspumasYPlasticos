// 📦 Importamos las librerías necesarias
const cloudinary = require('cloudinary').v2; // SDK oficial de Cloudinary
const CloudinaryStorage = require('multer-storage-cloudinary'); // Adaptador Multer para Cloudinary
const multer = require('multer'); // Middleware para manejo de multipart/form-data
require('dotenv').config(); // Carga variables de entorno desde .env

// 🔍 Validar variables de entorno de Cloudinary
console.log('\n☁️  Validando configuración de Cloudinary...');
const requiredCloudinaryVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingCloudinaryVars = requiredCloudinaryVars.filter(varName => !process.env[varName]);

if (missingCloudinaryVars.length > 0) {
  console.error('❌ Variables de entorno faltantes para Cloudinary:');
  missingCloudinaryVars.forEach(varName => console.error(`   📌 ${varName}`));
  process.exit(1);
}

console.log('   ✅ Variables de entorno configuradas');
console.log(`   ☁️  Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
console.log(`   🔑 API Key: ${process.env.CLOUDINARY_API_KEY?.substring(0, 8)}...`);

// ✅ Configuración de Cloudinary con variables del entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,     // Nombre de tu cuenta Cloudinary o empresa 
  api_key: process.env.CLOUDINARY_API_KEY,           // tu API Key de Cloudinary
  api_secret: process.env.CLOUDINARY_API_SECRET,     // tu API Secret de Cloudinary
  secure: true,                                       // Usar HTTPS
  timeout: 30000                                      // Timeout de 30 segundos
});

// 🔗 Probar conexión a Cloudinary
cloudinary.api.ping()
  .then((result) => {
    console.log('✅ Conexión a Cloudinary exitosa');
    console.log(`   ⚡ Respuesta: ${result.status}`);
  })
  .catch((error) => {
    console.error('❌ Error conectando a Cloudinary:', error.message);
    console.error('\n🔧 Detalles:');
    console.error(`   ${error}`);
  });

// 🗃️ Configuración de almacenamiento para Multer usando Cloudinary
const createStorage = (folderName = 'espumas_plasticos_general') => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName, // Carpeta específica en Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'], // Formatos permitidos
      transformation: [{ width: 800, height: 600, crop: 'limit' }], // Redimensionar automáticamente
      resource_type: 'image',
      public_id: (req, file) => {
        // Generar ID único: timestamp + random string + nombre original sin extensión
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 9);
        const originalName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
        return `${timestamp}-${randomStr}-${originalName}`;
      }
    }
  });
};

// 🛡️ Filtro de archivos: solo se permiten imágenes válidas
const fileFilter = (req, file, cb) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']; // Tipos MIME válidos
  if (validTypes.includes(file.mimetype)) {
    cb(null, true); // ✅ Aceptado
  } else {
    cb(new Error('Formato de imagen no permitido. Solo se permiten: JPEG, PNG, JPG, WEBP'), false); // ❌ Rechazado
  }
};

// 🎯 Instancias de Multer configuradas para diferentes propósitos
const uploadProduct = multer({ 
  storage: createStorage('espumas_plasticos_productos'),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  }
});

const uploadCategory = multer({ 
  storage: createStorage('espumas_plasticos_categorias'),
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB máximo para iconos
  }
});

const uploadGeneric = multer({ 
  storage: createStorage('espumas_plasticos_general'),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  }
});

// 🔍 Función para probar conexión a Cloudinary
async function testCloudinaryConnection() {
  try {
    console.log('\n☁️  Probando conexión a Cloudinary...');
    
    const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Variables de entorno faltantes para Cloudinary:');
      missingVars.forEach(varName => console.error(`   📌 ${varName}`));
      return false;
    }
    
    console.log('   ✅ Variables de entorno configuradas');
    console.log(`   🌩️  Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(`   🔑 API Key: ${process.env.CLOUDINARY_API_KEY?.substring(0, 8)}...`);
    
    // Test de ping con timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout en ping a Cloudinary')), 10000);
    });
    
    const pingPromise = cloudinary.api.ping();
    const result = await Promise.race([pingPromise, timeoutPromise]);
    
    if (result.status === 'ok') {
      console.log('✅ Conexión a Cloudinary exitosa');
      console.log(`   ⚡ Respuesta: ${result.status} (${result.message || 'Servicio disponible'})`);
      return true;
    } else {
      console.error('❌ Cloudinary respondió con error:', result);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error conectando a Cloudinary:', error.message);
    return false;
  }
}

// 🔄 Función para eliminar imagen de Cloudinary
async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('❌ Error eliminando imagen:', error.message);
    return false;
  }
}

// 📊 Función para obtener URL optimizada
function getOptimizedUrl(publicId, width = 800, height = 600) {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto'
  });
}

// 🚀 Exportamos para uso en rutas o controladores
module.exports = {
  cloudinary,          // Instancia de Cloudinary
  uploadProduct,       // Para productos: uploadProduct.single('imagen')
  uploadCategory,      // Para categorías: uploadCategory.single('icono')
  uploadGeneric,       // Para otros usos: uploadGeneric.single('archivo')
  testCloudinaryConnection, // Probar conexión
  deleteImage,         // Eliminar imágenes
  getOptimizedUrl      // Obtener URL optimizada
};