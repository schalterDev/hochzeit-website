import {Geschenk} from "./geschenk";
import AjaxRequest from "./ajax_requests";

const scrollingTime = 500;
const paddingTop = 125;
let geschenke = [];

loadGeschenke();

function loadGeschenke() {
    AjaxRequest.getRequest(`http://${location.hostname}:3000/api/geschenke`, (result, error) => {
        if(result) {
            geschenke = result.geschenke;

            if(geschenke.length === 0)
                return;

            let geschenkeGrid = $('#geschenke-grid');
            geschenkeGrid.html("");

            geschenke.forEach((geschenkJson) => {
                let geschenkObject = new Geschenk(geschenkJson);
                geschenkeGrid.append(geschenkObject.getGeschenkDom());
                geschenkeGrid.append(geschenkObject.getGeschenkModalDom());
            });
        } else {
            alert(`Fehler beim Laden der Geschenke: ${error}`);
        }
    })
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