// middleware/upload.middleware.js
const { 
  uploadProduct, 
  uploadCategory, 
  uploadGeneric,
  deleteImage 
} = require('../config/cloudinary');

// Middleware para upload de productos
const productUpload = (req, res, next) => {
  const uploadMiddleware = uploadProduct.single('imagen');
  
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error en upload de imagen del producto',
        error: err.message
      });
    }
    
    // Si se subió un archivo, agregar información al request
    if (req.file) {
      req.imageInfo = {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      };
    }
    
    next();
  });
};

// Middleware para upload de categorías
const categoryUpload = (req, res, next) => {
  const uploadMiddleware = uploadCategory.single('icono');
  
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error en upload de icono de categoría',
        error: err.message
      });
    }
    
    if (req.file) {
      req.imageInfo = {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      };
    }
    
    next();
  });
};

// Middleware para upload de múltiples imágenes
const multipleUpload = (req, res, next) => {
  const uploadMiddleware = uploadGeneric.array('imagenes', 5); // Máximo 5 imágenes
  
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error en upload de múltiples imágenes',
        error: err.message
      });
    }
    
    if (req.files && req.files.length > 0) {
      req.imagesInfo = req.files.map(file => ({
        url: file.path,
        publicId: file.filename,
        originalName: file.originalname,
        size: file.size
      }));
    }
    
    next();
  });
};

// Middleware para eliminar imagen
const deleteImageMiddleware = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere publicId de la imagen'
      });
    }
    
    const deleted = await deleteImage(publicId);
    
    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'No se pudo eliminar la imagen'
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error eliminando imagen',
      error: error.message
    });
  }
};

module.exports = {
  productUpload,
  categoryUpload,
  multipleUpload,
  deleteImageMiddleware
};