/*
{
    title: title,
    description: description,
    imageUrl: url,
    productLinks: [
        { linkText: linkText, linkUrl: linkUrl, }, ...
    ],
    name: name,  //name who wants to buy this present, can be null
    vorschlag: true/false,
    noName: true/false
}
 */

import AjaxRequest from "./ajax_requests";

export class Geschenk {

    constructor(json) {
        this.json = json;
        this._generateDoms();
    }

    _generateDoms() {
        this._generateGeschenkDom();
        this._generateModalDom();
        if(this.json.name) {
            this._deactivateGeschenk();
        } else {

        }
    }

    /*
    <div class="grid-element">
        <div class="grid-image">
            <img src="..." />
        </div>
        <div class="grid-description">
            <p>...</p>
        </div>
    </div>
     */
    _generateGeschenkDom() {
        this.geschenkDom = $('<div class="grid-element"></div>');

        let image = $(
            '<div class="grid-image">' +
                '<div><img alt="' + this.json.title + '" src="' + location.pathname + this.json.imageUrl + '" /></div>' +
                '<div class="not-available-img">' +
                    '<img src="static/img/nicht-mehr-verfuegbar.png" />' +
                '</div>' +
            '</div>');
        let description = $('<div class="grid-description"> <p>' + this.json.title + '</p></div>');

        this.geschenkDom = this.geschenkDom.append(image);
        this.geschenkDom = this.geschenkDom.append(description);

        this.geschenkDom.on('click', this._openModal.bind(this));
    }

    _generateModalDom() {
        this.modalDom = $(`<div class="modalGeschenk modal fade" id="${Geschenk.PREFIXES.MODAL_CLASS_PREFIX + this.json.title}" role="dialog" data-backdrop="static" data-keyboard="false"></div>`);

        // modal-lg to modal-dialog
        let modalDialog = $('<div class="modal-dialog" role="document"></div>');
        let modalContent = $('<div class="modal-content"></div>');
        let modalFooter = $('<div class="modal-footer"></div>');

        let modalHeader =
            $('<div class="modal-header">' +
                `<h4 class="modal-title">${this.json.title}</h4>` +
                '</div>');

        let productLinksHtml = "";
        if(this.json.productLinks) {
            if(this.json.vorschlag) {
                productLinksHtml =
                    '<h6>Das gefällt uns zum Beispiel</h6>'
            } else {
                productLinksHtml =
                    '<h6>Bitte folgendes Produkt kaufen</h6>'
            }

            productLinksHtml +=
                '<ul>' +
                this.json.productLinks.map((element) => `<li><a target="_blank" href="${element.linkUrl}">${element.linkText}</a></li>`).join('') +
                '</ul>';
        }

        let buttonName = "";
        if(!this.json.noName) {
            buttonName =
                '<div>' +
                    `<button class="btn btn-info geschenk-expand" id="${this._getIdFor(Geschenk.PREFIXES.MODAL_BUTTON_EXPAND_PREFIX)}">Das möchte ich schenken</button>` +
                    '<div class="notAvailable">' +
                        '<hr>' +
                        '<p>Dieses Produkt wurde schon von jemandem ausgewählt</p>' +
                    '</div>' +
                    '<div class="buttonName">' +
                        '<hr>' +
                        `<p>Bitte gib deinen Namen ein und klicke unten rechts auf '${Geschenk.TEXT.BUTTON_SEND}'.</p>` +
                        '<input type="text" placeholder="Name" required />' +
                        `<p><br/>Danach kann sich niemand mehr für dieses Geschenk eintragen.</p>` +
                    '</div>' +
                '</div>';
        }

        let modalBody = $(
            '<div class="modal-body">' +
                `<img alt="${this.json.title}" src="${location.pathname}${this.json.imageUrl}" />` +
                '<p class="geschenk-description">' +
                    this.json.description +
                '</p>' +
                productLinksHtml +
                buttonName +
            '</div>');

        this.modalButtonSend = $(`<button type="button" class="btn btn-success" id="${this._getIdFor(Geschenk.PREFIXES.MODAL_BUTTON_PREFIX)}">Schließen</button>`);
        this.modalButtonCancel = $(`<button type="button" class="btn btn-warning">Abbrechen</button>`);

        modalFooter = modalFooter.append(this.modalButtonCancel);
        modalFooter = modalFooter.append(this.modalButtonSend);
        modalContent = modalContent.append(modalHeader);
        modalContent = modalContent.append(modalBody);
        modalContent = modalContent.append(modalFooter);

        modalDialog = modalDialog.append(modalContent);
        this.modalDom = this.modalDom.append(modalDialog);

        this.divNotAvailable = this.modalDom.find('.notAvailable');
        this.nameInputDiv = this.modalDom.find('.buttonName');
        this.nameInputField = this.nameInputDiv.find('input');
        this.buttonExpand = this.modalDom.find(`#${this._getIdFor(Geschenk.PREFIXES.MODAL_BUTTON_EXPAND_PREFIX)}`).on('click', this._expandName.bind(this));
        this.modalButtonSend.on('click', () => this._clickButtonSend.call(this));
        this.modalButtonCancel.on('click', () => this._clickButtonSend.call(this, true));
        this.nameInputField.on('input', () => this._inputName.call(this, this.nameInputField.val()));
        this.modalButtonCancel.hide();
        this.divNotAvailable.hide();

        this.nameInput = false;
    }

    _openModal() {
        if(this.modalDom) {
            this.modalDom.modal('show', {
                backdrop: 'static',
                keyboard: false,
            });
        }
    }

    _expandName() {
        this.nameInput = true;
        this.nameInputDiv.show();
        this.buttonExpand.hide();
        this.modalButtonCancel.show();
        this.modalButtonSend.html(Geschenk.TEXT.BUTTON_SEND);
        this.modalButtonSend.prop("disabled",true);
    }

    _inputName(name) {
        this.name = name;
        if(name)
            this.modalButtonSend.prop("disabled",false);
        else
            this.modalButtonSend.prop("disabled",true);
    }

    _deactivateGeschenk() {
        this.geschenkDom.addClass('deactivated');
        this.buttonExpand.hide();
        this.modalButtonSend.hide();
        this.modalButtonCancel.show();
        this.divNotAvailable.show();
    }

    _clickButtonSend(cancle = false) {
        if(cancle || !this.nameInput) {
            console.log('cancle modal');
            this.modalDom.modal('hide');
        } else {
            if(this.name) {
                this.modalDom.modal('hide');

                AjaxRequest.postMessage(AjaxRequest.BASE_URL + '/api/geschenke',
                    `name=${this.name}&title=${this.json.title}`);

                this._deactivateGeschenk();
            } else {
                console.log('no name was set');
            }
        }
    }

    _getIdFor(prefix) {
        return prefix + this.json.title;
    }

    getGeschenkDom() {
        return this.geschenkDom;
    }

    getGeschenkModalDom() {
        return this.modalDom;
    }

    getDom() {
        return this.getGeschenkDom().append(this.getGeschenkModalDom());
    }

    static getLastElement() {return null};
}

Geschenk.TEXT = {
    BUTTON_SEND: "Abschicken"
};

Geschenk.PREFIXES = {
    MODAL_CLASS_PREFIX: "geschenk-modal-",
    MODAL_BUTTON_EXPAND_PREFIX: "geschenk-button-expand",
    MODAL_BUTTON_PREFIX: "geschenk-button-"
};