// create-database.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function crearBaseDeDatos() {
  console.log('🚀 Iniciando creación de base de datos y tablas...\n');

  // 🔍 Validar variables de entorno
  const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Variables de entorno faltantes:');
    missingVars.forEach(varName => console.error(`   📌 ${varName}`));
    console.error('\n💡 Asegúrate de tener un archivo .env con las siguientes variables:');
    console.error('   DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    process.exit(1);
  }

  const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true // Permitir múltiples consultas
  };

  let connection;

  try {
    // 1️⃣ Conectar sin base de datos específica
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión al servidor MySQL exitosa');

    const dbName = process.env.DB_NAME || 'plaxtilineas_db';
    
    // 2️⃣ Crear base de datos si no existe
    console.log(`\n📦 Creando base de datos '${dbName}'...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` 
                            CHARACTER SET utf8mb4 
                            COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Base de datos '${dbName}' creada/verificada`);

    // 3️⃣ Usar la base de datos
    await connection.query(`USE \`${dbName}\``);
    console.log(`✅ Usando base de datos '${dbName}'`);

    // 4️⃣ Crear tabla de usuarios
    console.log('\n👥 Creando tabla de usuarios...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol ENUM('admin', 'cliente', 'vendedor') DEFAULT 'cliente',
        estado ENUM('activo', 'inactivo', 'pendiente') DEFAULT 'activo',
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_correo (correo),
        INDEX idx_rol (rol),
        INDEX idx_estado (estado)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabla "usuarios" creada/verificada');

    // 5️⃣ Crear tabla de categorías
    console.log('\n📁 Creando tabla de categorías...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        icono_url VARCHAR(500),
        icono_public_id VARCHAR(200),
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_nombre (nombre)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabla "categorias" creada/verificada');

    // 6️⃣ Crear tabla de subcategorías
    console.log('\n📂 Creando tabla de subcategorías...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS subcategorias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        categoria_id INT NOT NULL,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE,
        INDEX idx_categoria (categoria_id),
        INDEX idx_nombre (nombre),
        UNIQUE KEY uk_subcategoria_categoria (nombre, categoria_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabla "subcategorias" creada/verificada');

    // 7️⃣ Crear tabla de productos
    console.log('\n📦 Creando tabla de productos...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(200) NOT NULL,
        descripcion TEXT,
        cantidad INT DEFAULT 0,
        precio DECIMAL(10, 2) NOT NULL,
        subcategoria_id INT NOT NULL,
        FOREIGN KEY (subcategoria_id) REFERENCES subcategorias(id) ON DELETE CASCADE,
        INDEX idx_nombre (nombre),
        INDEX idx_subcategoria (subcategoria_id),
        INDEX idx_precio (precio),
        INDEX idx_cantidad (cantidad),
        FULLTEXT idx_busqueda (nombre, descripcion)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabla "productos" creada/verificada');

    // 8️⃣ Crear tabla de imágenes de productos
    console.log('\n🖼️ Creando tabla de imágenes de productos...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS producto_imagenes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        producto_id INT NOT NULL,
        imagen_url VARCHAR(500) NOT NULL,
        public_id VARCHAR(200) NOT NULL,
        orden INT DEFAULT 0,
        FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
        INDEX idx_producto (producto_id),
        INDEX idx_orden (orden),
        UNIQUE KEY uk_public_id (public_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Tabla "producto_imagenes" creada/verificada');

    // 9️⃣ Crear usuario administrador
    console.log('\n👑 Creando usuario administrador...');
    
    // Encriptar la contraseña
    const bcrypt = require('bcryptjs');
    const correoAdmin = 'admin.espumas';
    const passwordPlain = 'Espumas.123'; // Contraseña proporcionada
    const hashedPassword = await bcrypt.hash(passwordPlain, 10);
    
    await connection.query(`
      INSERT INTO usuarios (nombre, correo, password, rol, estado)
      VALUES (?, ?, ?, 'admin', 'activo')
      ON DUPLICATE KEY UPDATE
        nombre = VALUES(nombre),
        password = VALUES(password),
        rol = VALUES(rol),
        estado = VALUES(estado)
    `, ['Administrador', correoAdmin, hashedPassword]);
    
    console.log('✅ Usuario administrador creado');
    console.log('   📧 Correo: admin.espumas');
    console.log('   🔐 Contraseña: Espumas.123');
    console.log('   ⚠️  RECOMENDADO: Cambia esta contraseña después del primer inicio de sesión');

    console.log('\n🎉 ¡Base de datos configurada exitosamente!');
    console.log('\n📊 Resumen de tablas creadas:');
    console.log('   ✅ usuarios');
    console.log('   ✅ categorias');
    console.log('   ✅ subcategorias');
    console.log('   ✅ productos');
    console.log('   ✅ producto_imagenes');
    
    console.log('\n🔗 Credenciales de administrador:');
    console.log('   📧 Correo: admin.espumas');
    console.log('   🔐 Contraseña: Espumas.123');
    console.log('\n⚠️  IMPORTANTE: Las tablas están vacías, listas para que agregues tus datos');

  } catch (error) {
    console.error('\n❌ Error durante la creación de la base de datos:', error.message);
    console.error('\n🔧 Detalles del error:');
    console.error(`   Código: ${error.code}`);
    console.error(`   Errno: ${error.errno}`);
    
    // Mensajes de error específicos
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Posible solución:');
      console.error('   1. Verifica el usuario y contraseña de MySQL');
      console.error('   2. Asegúrate de que el usuario tenga permisos para crear bases de datos');
    } else if (error.code === 'ER_DBACCESS_DENIED_ERROR') {
      console.error('\n💡 Posible solución:');
      console.error('   El usuario no tiene permisos para crear la base de datos');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n💡 Posible solución:');
      console.error('   La base de datos especificada no existe');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Conexión cerrada');
    }
  }
}

// Ejecutar el script
crearBaseDeDatos();