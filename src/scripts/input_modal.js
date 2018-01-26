import AjaxRequest from './ajax_requests';
import Elements from './elements';

let modal;
let countInput;
let productInput;
let nameInput;
let buttonSend;

let useCount;

function openNachtisch() {
    openModal('Nachtisch', true);
    setListener(( ) => {
        let product = productInput.val();
        let name = nameInput.val();
        let count = countInput.val();

        AjaxRequest.putMessage(AjaxRequest.BASE_URL + '/api/nachtische',
            `nachtisch=${product}&name=${name}&anzahl=${count}`,
            () => {
                Elements.loadNachtische();
            });

        closeModal();
    });
}

function openSalat() {
    openModal('Salat', true);
    setListener(( ) => {
        let product = productInput.val();
        let name = nameInput.val();
        let count = countInput.val();

        AjaxRequest.putMessage(AjaxRequest.BASE_URL + '/api/salate',
            `salat=${product}&name=${name}&anzahl=${count}`,
            () => {
                Elements.loadSalate();
            });

        closeModal();
    });
}

function openKuchen() {
    openModal('Kuchen', false);
    setListener(( ) => {
        let product = productInput.val();
        let name = nameInput.val();
        let count = countInput.val();

        AjaxRequest.putMessage(AjaxRequest.BASE_URL + '/api/kuchen',
            `kuchen=${product}&name=${name}&anzahl=${count}`,
            () => {
                Elements.loadKuchen();
            });

        closeModal();
    });
}

function setListener(listener) {
    buttonSend.off();
    console.log(productInput.val());

    buttonSend.on('click', listener);
}

function closeModal() {
    modal.modal('hide');
}

function openModal(title, showCount) {
    useCount = showCount;

    if(!modal) {
        modal = $('#modal-insert');
        countInput = modal.find('#insert-count');
        productInput = modal.find('#insert-product');
        nameInput = modal.find('#insert-name');
        buttonSend = modal.find('#insert-button-send');

        modal.find('#insert-button-back').on('click', () => {
            modal.modal('hide');
        });

        countInput.on('input', valueChanged);
        productInput.on('input', valueChanged);
        nameInput.on('input', valueChanged);
    }

    countInput.val('');
    productInput.val('');
    nameInput.val('');

    valueChanged();

    modal.modal('show', {
        backdrop: 'static',
        keyboard: false,
    });

    if(showCount) {
        countInput.parent().show();
    } else {
        countInput.parent().hide();
    }
}

function valueChanged() {
    let activateButton = true;
    if(productInput.val() === '')
        activateButton = false;

    if(nameInput.val() === '')
        activateButton = false;

    if(useCount && countInput.val() <= 0)
        activateButton = false;

    buttonSend.prop("disabled",!activateButton);
}

export default {
    openNachtisch,
    openSalat,
    openKuchen,
};