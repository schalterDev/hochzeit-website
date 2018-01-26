/*
{
    "nachtisch": "quark",
    "name": "Name der Person",
    "anzahl": 5
}
*/

import InputModal from "./input_modal";

export class Nachtisch {

    constructor(json) {
        this.json = json;
    }

    getDom() {
        return $(`<tr> <td>${this.json.nachtisch}</td><td>${this.json.name}</td><td>${this.json.anzahl}</td>`);
    }

    static getLastElement() {
        return $(`<tr class="insertRow"><td colspan="3"><button class="btn btn-new-element">Ich bringe auch einen Nachtisch mit</button></td></tr>`).on('click', this.onClickNewElement);
    }

    static onClickNewElement() {
        InputModal.openNachtisch();
    }
}