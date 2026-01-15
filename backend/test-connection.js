require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('✅ Conexión exitosa a MySQL!');
    console.log('📊 Información de conexión:');
    console.log(`   Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log(`   Base de datos: ${process.env.DB_NAME}`);
    console.log(`   Usuario: ${process.env.DB_USER}`);

    // Verificar version de MySQL
    const [rows] = await connection.execute('SELECT VERSION() as version');
    console.log(`   MySQL Version: ${rows[0].version}`);

    // Ver tablas existentes
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`   Tablas en ${process.env.DB_NAME}: ${tables.length}`);

    if (tables.length > 0) {
      console.log('   Lista de tablas:');
      tables.forEach((table, index) => {
        const tableName = Object.values(table)[0];
        console.log(`     ${index + 1}. ${tableName}`);
      });
    }

    await connection.end();
    console.log('\n✅ Prueba de conexión completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('\n🔧 Solución de problemas:');
    console.log('   1. Verifica que el contenedor Docker esté corriendo:');
    console.log('      docker ps | findstr espumas_db');
    console.log('   2. Verifica los puertos:');
    console.log('      El contenedor usa puerto 3307, no 3306');
    console.log('   3. Prueba conectarte manualmente:');
    console.log('      mysql -h 127.0.0.1 -P 3307 -u root -proot');
  }
}

testConnection();