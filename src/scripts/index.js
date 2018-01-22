import {Geschenk} from "./geschenk";
import AjaxRequest from "./ajax_requests";
import {Kuchen} from "./kuchen";
import {Salat} from "./salate";
import {Nachtisch} from "./nachtisch";

const scrollingTime = 500;
const paddingTop = 125;

const BASE_URL = `http://${location.hostname}:3000`;

const GESCHENKE = $('#geschenke');
const SALATE = $('#salate');
const NACHTISCHE = $('#nachtisch');
const KUCHEN = $('#kuchen');

loadElements('/api/geschenke', GESCHENKE, '#geschenke-grid', Geschenk);
loadElements('/api/salate', SALATE, 'tbody', Salat);
loadElements('/api/nachtische', NACHTISCHE, 'tbody', Nachtisch);
loadElements('/api/kuchen', KUCHEN, 'tbody', Kuchen);

function loadElements(url, domElement, childElementSelector, classToInsert) {
    showLoader(domElement);
    AjaxRequest.getRequest(`${BASE_URL}${url}`, (result, error) => {
        if(result) {
            let elements = result.elements;

            if(elements.length === 0)
                return;

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

// Smooth scroll for in page links - http://wibblystuff.blogspot.in/2014/04/in-page-smooth-scroll-using-css3.html
// Improvements from - https://codepen.io/kayhadrin/pen/KbalA
$('.navbar-nav a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - paddingTop
    }, scrollingTime);

    //close navbar
    let navbar = $('.navbar-toggler');
    if(!navbar.hasClass('collapsed'))
        navbar.click();
    return false;
});