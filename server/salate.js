const jsonLoader = require('./json_loader');

const SALATE_FILE = 'data/salate.json';

class Salate extends jsonLoader{
    constructor() {
        super(SALATE_FILE, { salate: [] ,});
    }

    getSalate() {
        return this.json;
    }

    addSalat(salat, name, count) {
        console.log(`Save salate: salat: ${salat}, name: ${name}, count: ${count}`);

        this.json.nachtische.push({salat: salat, name: name, anzahl: count})
        this.save();
    }
}

module.exports = new Salate();
