"use strict";

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f){setTimeout(f, 1000/60);};

const topBG = document.querySelector('#banner');
const botBG = document.querySelector('#contact');
const body = document.querySelector('body');

function shiftBackground() {
    // implements parallax effects
    let fromTop = window.pageYOffset;
    let fromBot = body.scrollHeight - (fromTop + window.innerHeight);
    topBG.style.backgroundPosition = "center bottom " + (fromTop * 0.5) + "px";
    botBG.style.backgroundPosition = "center top " + (fromBot * 0.5) + "px";
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => shiftBackground());
}, false);