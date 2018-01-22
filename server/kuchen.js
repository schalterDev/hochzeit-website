const jsonLoader = require('./json_loader');

const KUCHEN_FILE = 'data/geschenke.json';

class Kuchen extends jsonLoader{
    constructor() {
        super(KUCHEN_FILE, { kuchen: [] ,});
    }

    getKuchen() {
        return this.json;
    }

    addKuchen(kuchen, name,) {
        console.log(`Save kuchen: kuchen: ${kuchen}, name: ${name}`);

        this.json.kuchen.push({kuchen: kuchen, name: name})
        this.save();
    }
}

module.exports = new Kuchen();
