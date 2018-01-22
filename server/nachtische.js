const jsonLoader = require('./json_loader');

const NACHTISCH_FILE = 'data/nachtische.json';

class Nachtische extends jsonLoader{
    constructor() {
        super(NACHTISCH_FILE);
    }

    getNachtische() {
        return this.json;
    }

    addNachtisch(kuchen, name, count) {
        console.log(`Save kuchen: kuchen: ${kuchen}, name: ${name}, count: ${count}`);

        super.push({kuchen: kuchen, name: name, anzahl: count})
    }
}

module.exports = new Nachtische();
