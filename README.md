# Aplicación de tareas por consola – Node + Oracle (FreeSQL)

## Puesta en marcha

1. Instalar paquetes:

   ```bash
   npm install colors inquirer@8 uuid@9 oracledb
   ```

2. Crear tus datos de conexión:

   - Copia `helpers/config.example.js` como `helpers/config.js`.
   - Rellena `user`, `password` y `connectString` con los datos de FreeSQL
     (Schema Connection Details).
   - `helpers/config.js` está en `.gitignore`: nunca se sube a git.

3. Crear la tabla ejecutando `database/tareas.sql` en el editor de FreeSQL.

4. Probar la conexión y arrancar:

   ```bash
   node probarConexion.js
   node app.js
   ```
