const fs = require('fs');

class JsonLoader {
    constructor(path, defaultJson = { elements: []}) {
        this.path = path;
        this.loadJson(defaultJson);
    }

    loadJson(defaultJson) {
        if (!this.json) {
            if (!fs.existsSync(this.path)) {
                this.json = defaultJson;
                this.save();
            } else {
                this.json = JSON.parse(fs.readFileSync(this.path, 'utf8'));
            }
        }
    }

    push(json) {
        this.json.elements.push(json);
        save();
    }

    save() {
        fs.writeFileSync(this.path, JSON.stringify(this.json), 'utf8');
    }
}

module.exports = JsonLoader;
