"use strict";

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

function addNav() {
    document.querySelector(".global-nav.fixed").style.transform = "translate(0,0rem)";
}

function remNav() {
    document.querySelector(".global-nav.fixed").style.transform = "translate(0,-3rem)";
}

document.querySelectorAll('.gform>.form-text-field').forEach((field) => {
    field.addEventListener('blur', () => {
        if (field.value) {
            field.classList.add('filled');
        } else {
            field.classList.remove('filled');
        }
    });
});

document.querySelector('.gform>input[type=reset]').addEventListener('click', () => {
    document.querySelectorAll('.gform>.form-text-field').forEach((field) => field.classList.remove('filled'));
});

let observer = new IntersectionObserver();