const jsonLoader = require('./json_loader');

const GESCHENKE_FILE = 'data/geschenke.json';

class Geschenke extends jsonLoader{
    constructor() {
        super(GESCHENKE_FILE);
    }

    getGeschenke() {
        return this.json;
    }

    updateGeschenk(title, name) {
        console.log(`Save geschenk: title: ${title}, name: ${name}`);

        let index = this.json.elements.findIndex((element) => element.title === title);

        if(!this.json.elements[index].name) {
            this.json.elements[index].name = name;
            this.save();
            return true;
        } else {
            //error already a name
            return false;
        }
    }
}

module.exports = new Geschenke();
