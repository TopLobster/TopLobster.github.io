"use strict";

/* animate backgrounds on scroll */
// TODO refactor to make this use Intersection Observers on each image for better performance
// TODO refactor this with the HTML structure to make it use CSS transition: translate(); on a background image element for better performance
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f){setTimeout(f, 1000/60);};

const topBG = document.querySelector('#banner');
const botBG = document.querySelector('#contact');
const body = document.querySelector('body');

function shiftBackground() {
    // implements parallax effects
    let fromTop = window.pageYOffset;
    let fromBot = body.scrollHeight - (fromTop + window.innerHeight);
    topBG.style.backgroundPosition = "center bottom " + (-fromTop * 0.5) + "px";
    botBG.style.backgroundPosition = "center top " + (-fromBot * 0.5) + "px";
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => shiftBackground());
}, false);

/* Add and remove the Nav on scroll */
function addNav() {
    document.querySelector(".global-nav.fixed").style.transform = "translate(0,0rem)";
}

function remNav() {
    document.querySelector(".global-nav.fixed").style.transform = "translate(0,-3.5rem)";
}

const bannerIO = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.75) {
            remNav();
        }
        if (entry.intersectionRatio <= 0.75) {
            addNav();
        }
    });
}, {
    threshold: [0.75]
});

bannerIO.observe(document.querySelector('#banner'));

/* Keep opacity on filled form element if losing focus */
document.querySelectorAll('.gform>.form-text-field').forEach((field) => {
    field.addEventListener('blur', () => {
        if (field.value) {
            field.classList.add('filled');
        } else {
            field.classList.remove('filled');
        }
    });
});

/* Remove opacity when form reset from above*/
document.querySelector('.gform>input[type=reset]').addEventListener('click', () => {
    document.querySelectorAll('.gform>.form-text-field').forEach((field) => field.classList.remove('filled'));
});