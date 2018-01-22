/*
{
    "kuchen": "Rotweinkuchen",
    "name": "Name der Person"
}
 */

export class Kuchen {

    constructor(json) {
        this.json = json;
    }

    getDom() {
        return $(`<tr> <td>${this.json.kuchen}</td><td>${this.json.name}</td>`);
    }

    static getLastElement() {
        return $(`<tr class="insertRow"><td colspan="2"><button class="btn btn-new-element">Ich bringe auch einen Kuchen mit</button></td></tr>`).on('click', this.onClickNewElement);
    }

    static onClickNewElement() {

    }

}