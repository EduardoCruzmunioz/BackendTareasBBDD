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

    //leemos y cargamos las tareas
    const tareasDB = await leerDB();

    if ( tareasDB ) { // cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas( true );
            break;

            case '4':
                tareas.listarPendientesCompletadas( false );
            break;

            case '5': // completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;

            case '6': // Borrar
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

        await guardarDB( tareas.listadoArr );

        await pausa();

    } while( opt !== '0' );

}

main();
