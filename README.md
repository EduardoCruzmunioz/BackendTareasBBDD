# Aplicación de tareas por consola – Node + Oracle (FreeSQL)

Aplicación de consola interactiva para gestionar tareas. Los datos se guardan en una base de datos Oracle (FreeSQL).

## Puesta en marcha

1. Instalar los paquetes:

   ```bash
   npm install
   ```

2. Crear los datos de conexión:

   - Copiar `helpers/config.example.js` como `helpers/config.js`.
   - Rellenar `user`, `password` y `connectString` con los datos de FreeSQL (Schema Connection Details).
   - `helpers/config.js` está en `.gitignore`, no se sube a git.

3. Crear la tabla ejecutando `database/tareas.sql` en el editor de FreeSQL.

4. Probar la conexión y arrancar:

   ```bash
   npm run probar
   npm start
   ```
