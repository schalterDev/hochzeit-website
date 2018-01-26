import AjaxRequest from "./ajax_requests";
import {Geschenk} from "./geschenk";
import {Kuchen} from "./kuchen";
import {Salat} from "./salate";
import {Nachtisch} from "./nachtisch";

const GESCHENKE = $('#geschenke');
const SALATE = $('#salate');
const NACHTISCHE = $('#nachtisch');
const KUCHEN = $('#kuchen');

function loadKuchen() {
    loadElements('/api/kuchen', KUCHEN, 'tbody', Kuchen);
}

function loadGeschenke() {
    loadElements('/api/geschenke', GESCHENKE, '#geschenke-grid', Geschenk);
}

function loadNachtische() {
    loadElements('/api/nachtische', NACHTISCHE, 'tbody', Nachtisch);
}

function loadSalate() {
    loadElements('/api/salate', SALATE, 'tbody', Salat);
}

function loadElements(url, domElement, childElementSelector, classToInsert) {
    showLoader(domElement);
    AjaxRequest.getRequest(`${AjaxRequest.BASE_URL}${url}`, (result, error) => {
        if(result) {
            let elements = result.elements;

            /*
            if(elements.length === 0) {
                return;
            }
            */

            let content = domElement.find(childElementSelector);
            content.html("");

            elements.forEach((json) => {
                content.append(new classToInsert(json).getDom());
            });

            content.append(classToInsert.getLastElement());

            hideLoader(domElement);
        } else {
            alert(`Fehler beim Laden der Daten: ${error}`);
        }
    });
}

function hideLoader(element) {
    element.find('.loaderContainer').hide();
    element.find('table').show();
}

function showLoader(element) {
    element.find('.loaderContainer').show();
    element.find('table').hide();
}

export default {
  loadKuchen,
  loadGeschenke,
  loadNachtische,
  loadSalate,
};