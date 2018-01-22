const jsonLoader = require('./json_loader');

const GESCHENKE_FILE = 'data/geschenke.json';

class Geschenke extends jsonLoader{
    constructor() {
        super(GESCHENKE_FILE, { geschenke: [] ,});
    }

    getGeschenke() {
        return this.json;
    }

    updateGeschenk(title, name) {
        console.log(`Save geschenk: title: ${title}, name: ${name}`);

        let index = this.json.geschenke.findIndex((element) => element.title === title);
        this.json.geschenke[index].name = name;
        this.save();
    }
}

module.exports = new Geschenke();
