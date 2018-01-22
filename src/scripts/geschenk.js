/*
{
    title: title,
    description: description,
    imageUrl: url,
    product-links: [
        { linkText: linkText, linkUrl: linkUrl, }, ...
    ],
    name: name  //name who wants to buy this present, can be null
}
 */

export class Geschenk {

    constructor(json) {
        this.json = json;
        this._generateDoms();
    }

    _generateDoms() {
        this._generateGeschenkDom();
        this._generateModalDom();
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
            '<img alt="' + this.json.title + '" src="' + this.json.imageUrl + '" />' +
            '</div>');
        let description = $('<div class="grid-description"> <p>' + this.json.title + '</p></div>');

        this.geschenkDom = this.geschenkDom.append(image);
        this.geschenkDom = this.geschenkDom.append(description);

        this.geschenkDom.on('click', this._openModal.bind(this));
    }

    _generateModalDom() {
        this.modalDom = $(`<div class="modal fade" id="${Geschenk.PREFIXES.MODAL_CLASS_PREFIX + this.json.title}" role="dialog" data-backdrop="static" data-keyboard="false"></div>`);

        let modalDialog = $('<div class="modal-dialog" role="document"></div>');
        let modalContent = $('<div class="modal-content"></div>');
        let modalFooter = $('<div class="modal-footer"></div>');

        let modalHeader =
            $('<div class="modal-header">' +
                `<h4 class="modal-title">${this.json.title}</h4>` +
                '</div>');

        let modalBody = $(`<div class="modal-body">${this.json.description}</div>`);
        let modalFooterButton = $(`<button type="button" class="btn btn-success" id="${Geschenk.PREFIXES.MODAL_BUTTON_PREFIX + this.json.title}">Send</button>`);

        modalFooter = modalFooter.append(modalFooterButton);
        modalContent = modalContent.append(modalHeader);
        modalContent = modalContent.append(modalBody);
        modalContent = modalContent.append(modalFooter);

        modalDialog = modalDialog.append(modalContent);
        this.modalDom = this.modalDom.append(modalDialog);

        modalFooterButton.on('click', this._clickButtonSend.bind(this));
    }

    _openModal() {
        this.modalDom.modal('show',{
            backdrop: 'static',
            keyboard: false,
        });
    }

    _clickButtonSend() {
        this.modalDom.modal('hide');
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

Geschenk.PREFIXES = {
    MODAL_CLASS_PREFIX: "geschenk-modal-",
    MODAL_BUTTON_PREFIX: "geschenk-button-"
};