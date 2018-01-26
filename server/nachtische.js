const jsonLoader = require('./json_loader');

const NACHTISCH_FILE = 'data/nachtische.json';

class Nachtische extends jsonLoader{
    constructor() {
        super(NACHTISCH_FILE);
    }

    getNachtische() {
        return this.json;
    }

    addNachtisch(nachtisch, name, anzahl) {
        console.log(`Save nachtisch: nachtisch: ${nachtisch}, name: ${name}, count: ${anzahl}`);

        super.push({nachtisch: nachtisch, name: name, anzahl: anzahl})
    }
}

module.exports = new Nachtische();
