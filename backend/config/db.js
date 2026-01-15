require('dotenv').config(); // Cargar variables del archivo .env

const mysql = require('mysql2/promise'); // Cliente MySQL con promesas

// 🔍 Validar variables de entorno
console.log('\n🔐 Validando configuración de Base de Datos...');
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Variables de entorno faltantes:');
  missingVars.forEach(varName => console.error(`   📌 ${varName}`));
  process.exit(1);
}

console.log('   ✅ Variables de entorno cargadas correctamente');
console.log(`   🖥️  Host: ${process.env.DB_HOST}`);
console.log(`   � Puerto: ${process.env.DB_PORT || 3306}`);
console.log(`   👤 Usuario: ${process.env.DB_USER}`);
console.log(`   🗄️  Base de datos: ${process.env.DB_NAME}`);

// Crear un pool de conexiones reutilizables
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 🔗 Probar conexión al pool
db.getConnection()
  .then((connection) => {
    console.log('✅ Conexión a Base de Datos exitosa');
    connection.release();
  })
  .catch((error) => {
    console.error('❌ Error conectando a Base de Datos:', error.message || error);
    console.error('\n🔧 Detalles del error:');
    console.error(`   Código: ${error.code}`);
    console.error(`   SQLState: ${error.sqlState}`);
    console.error(`   Errno: ${error.errno}`);
    console.error('\n💡 Sugerencias:');
    console.log('   1. Verifica que MySQL está corriendo en el puerto correcto');
    console.log('   2. Comprueba las credenciales en tu archivo .env');
    console.log('   3. Asegúrate de que la base de datos existe');
    process.exit(1);
  });

module.exports = db;
