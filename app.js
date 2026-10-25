require('colors');

const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/baseDatos');

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    // Cargar las tareas guardadas en la base de datos
    const tareasDB = await leerDB();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // Mostrar el menú y esperar la opción
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2':
                // Listar todas
                tareas.listadoCompleto();
            break;

            case '3':
                // Listar completadas
                tareas.listarPendientesCompletadas( true );
            break;

            case '4':
                // Listar pendientes
                tareas.listarPendientesCompletadas( false );
            break;

            case '5':
                // Marcar completadas o pendientes
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;

            case '6':
                // Borrar tarea con confirmación
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        // Guardar los cambios en la base de datos
        await guardarDB( tareas.listadoArr );

        await pausa();

    } while( opt !== '0' );

}

main();
