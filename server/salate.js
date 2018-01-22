const jsonLoader = require('./json_loader');

const SALATE_FILE = 'data/salate.json';

class Salate extends jsonLoader{
    constructor() {
        super(SALATE_FILE);
    }

    getSalate() {
        return this.json;
    }

    addSalat(salat, name, count) {
        console.log(`Save salate: salat: ${salat}, name: ${name}, count: ${count}`);

        super.push({salat: salat, name: name, anzahl: count});
    }
}

module.exports = new Salate();
