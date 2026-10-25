const { v4: uuidv4 } = require('uuid');

// Una tarea: id único, descripción y fecha en que se completó
class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ) {
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;
