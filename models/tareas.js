require('colors');
const Tarea = require('./Tarea');

// Colección de tareas guardadas en un objeto (la clave es el id)
class Tareas {

    constructor() {
        this._listado = {};
    }

    // Devuelve las tareas como array
    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    // Carga las tareas que vienen de la base de datos
    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    // Lista todas: Completada en verde, Pendiente en rojo
    listadoCompleto() {

        console.log();
        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${ i + 1 }.`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);
        });
    }

    // Lista completadas (true) o pendientes (false)
    listarPendientesCompletadas( completadas = true ) {

        console.log();

        const lista = this.listadoArr.filter( tarea =>
            completadas ? tarea.completadoEn : !tarea.completadoEn
        );

        lista.forEach( (tarea, i) => {

            const idx = `${ i + 1 }.`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? completadoEn.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);
        });
    }

    borrarTarea( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    // Marca como completadas las seleccionadas y deja pendientes el resto
    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }

}

module.exports = Tareas;
