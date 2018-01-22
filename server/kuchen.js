const jsonLoader = require('./json_loader');

const KUCHEN_FILE = 'data/kuchen.json';

class Kuchen extends jsonLoader{
    constructor() {
        super(KUCHEN_FILE);
    }

    getKuchen() {
        return this.json;
    }

    addKuchen(kuchen, name) {
        console.log(`Save kuchen: kuchen: ${kuchen}, name: ${name}`);

        super.push({kuchen: kuchen, name: name});
    }
}

module.exports = new Kuchen();
