import Elements from './elements';

const scrollingTime = 500;
const paddingTop = 125;

Elements.loadKuchen();
Elements.loadSalate();
Elements.loadNachtische();
Elements.loadGeschenke();

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