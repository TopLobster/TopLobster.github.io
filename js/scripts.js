window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f){setTimeout(f, 1000/60);};

const topBG = document.querySelector('#banner');
const botBG = document.querySelector('#contact');
const body = document.querySelector('body');

function shiftBackground() {
    // implements parallax effects
    let windowHeight = window.innerHeight;
    let fromTop = window.pageYOffset;
    let fromBot = body.scrollHeight - (fromTop + windowHeight);
    topBG.style.backgroundPositionY = 50 + (fromTop / windowHeight * 50)+ "%";
    botBG.style.backgroundPositionY = 50 + (-fromBot / windowHeight * 50) + "%";
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => shiftBackground());
}, false);