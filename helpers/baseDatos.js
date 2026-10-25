const oracledb = require('oracledb');

// Datos de conexión (archivo privado, no se sube a git)
const config = require('./config');

// Lee las tareas de la tabla. Devuelve null si no hay ninguna
const leerDB = async() => {

    const conn = await oracledb.getConnection( config );

    try {
        const result = await conn.execute(
            `SELECT ID, DESCRIPCION, COMPLETADO_EN
               FROM TAREAS
              ORDER BY CREADA`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if ( result.rows.length === 0 ) {
            return null;
        }

        return result.rows.map( row => ({
            id: row.ID,
            desc: row.DESCRIPCION,
            completadoEn: row.COMPLETADO_EN
        }));

    } finally {
        await conn.close();
    }
}

// Deja la tabla igual que el array de tareas que recibe
const guardarDB = async( tareas = [] ) => {

    const conn = await oracledb.getConnection( config );

    try {

        if ( tareas.length === 0 ) {

            // Sin tareas: vaciar la tabla
            await conn.execute( `DELETE FROM TAREAS` );

        } else {

            // Insertar las nuevas y actualizar las que ya existen
            await conn.executeMany(
                `MERGE INTO TAREAS t
                 USING (SELECT :id ID,
                               :descripcion DESCRIPCION,
                               :completadoEn COMPLETADO_EN
                          FROM dual) s
                    ON (t.ID = s.ID)
                  WHEN MATCHED THEN
                       UPDATE SET t.DESCRIPCION   = s.DESCRIPCION,
                                  t.COMPLETADO_EN = s.COMPLETADO_EN
                  WHEN NOT MATCHED THEN
                       INSERT (ID, DESCRIPCION, COMPLETADO_EN)
                       VALUES (s.ID, s.DESCRIPCION, s.COMPLETADO_EN)`,
                tareas.map( t => ({
                    id: t.id,
                    descripcion: t.desc,
                    completadoEn: t.completadoEn
                })),
                {
                    bindDefs: {
                        id:           { type: oracledb.STRING, maxSize: 36 },
                        descripcion:  { type: oracledb.STRING, maxSize: 500 },
                        completadoEn: { type: oracledb.STRING, maxSize: 30 }
                    }
                }
            );

            // Borrar las que ya no están en la lista
            const marcas = tareas.map( (t, i) => `:${ i + 1 }` ).join(',');
            await conn.execute(
                `DELETE FROM TAREAS WHERE ID NOT IN (${ marcas })`,
                tareas.map( t => t.id )
            );
        }

        await conn.commit();

    } catch ( error ) {
        // Si algo falla, deshacer los cambios
        await conn.rollback();
        throw error;
    } finally {
        await conn.close();
    }
}

module.exports = {
    guardarDB,
    leerDB
}
