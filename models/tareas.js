require('colors');
const Tarea = require('./Tarea');

class Tareas {

    constructor() {
        this._listado = {};
    }

    get listadoArr() {

        const listado = [];
        /**
         * JS tiene el métod keys de objeto que extrae cada una de las llaves que tenga
         * en este caso el objeto listado
         * Esta función crea un array
         */
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    // Formato: "1. Nombre :: Completada | Pendiente"
    // número en verde, Completada en verde, Pendiente en rojo
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

    // Una sola función: true => completadas, false => pendientes
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
