// Prueba solo la conexión a Oracle. Ejecutar: node probarConexion.js
const oracledb = require('oracledb');

// Usuario, password y conexión viven en helpers/config.js (no se sube a git)
const config = require('./helpers/config');

const probar = async() => {
    let conn;
    try {
        conn = await oracledb.getConnection( config );
        const r = await conn.execute( `SELECT 'CONECTADO' AS MSG FROM dual` );
        console.log( r.rows[0][0] );

        const t = await conn.execute( `SELECT COUNT(*) FROM TAREAS` );
        console.log( 'Tabla TAREAS OK. Filas:', t.rows[0][0] );
    } catch ( error ) {
        console.log( 'ERROR:', error.message );
    } finally {
        if ( conn ) await conn.close();
    }
}

probar();
