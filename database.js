const mysql = require('mysql2');
const { promisify } = require('util');

// Configuración de la conexión
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',       // Tu usuario de MySQL (suele ser root)
    password: '',       // Tu contraseña (en XAMPP suele estar vacía)
    database: 'portfolio_db' // El nombre exacto que pusimos en el script SQL
});

// Promisify para poder usar async/await (más moderno y limpio)
pool.query = promisify(pool.query);

// Mensaje para saber si conecta bien
pool.getConnection((err, connection) => {
    if (!err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONEXIÓN CON LA BASE DE DATOS SE CERRÓ.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('LA CONEXIÓN FUE RECHAZADA.');
        }
    }
    if (connection) connection.release();
    console.log('>>> BD conectada correctamente');
    return;
});

module.exports = pool;