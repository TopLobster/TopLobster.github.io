"use strict";

/* animate backgrounds on scroll */
// TODO refactor to make this use Intersection Observers on each image for better performance
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f){setTimeout(f, 1000/60);};

const topBG = document.querySelector('#banner>.background');
const botBG = document.querySelector('#contact>.background');
const body = document.querySelector('body');

function shiftBackground() {
    // implements parallax effects
    let fromTop = window.pageYOffset;
    let fromBot = body.scrollHeight - (fromTop + window.innerHeight);
    topBG.style.transform = 'translate(0,' + (fromTop * 0.7) + "px)";
    botBG.style.transform = 'translate(0,' + (-fromBot * 0.7) + "px)";
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
        if (entry.intersectionRatio >= 0.5) {
            remNav();
        }
        if (entry.intersectionRatio <= 0.5) {
            addNav();
        }
    });
}, {
    threshold: [0.5]
});

bannerIO.observe(document.querySelector('#banner'));

const lazyLoader = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            // .. do something
            if (entry.isIntersecting) {
                let img = entry.target.firstElementChild;
                let src = img.getAttribute('src-lazy');
                img.style.backgroundImage = `url("` + src + `")`;
                entry.target.classList.add("proj-move");
                observer.disconnect();
            }
        });
    });
    io.observe(target);
};

document.querySelectorAll('.project').forEach(project => lazyLoader(project));

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

window.onload = () => {
    document.querySelector('#banner>div>img');
    document.querySelector('#banner>div>h1');
    document.querySelector('#banner>div');
};