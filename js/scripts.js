"use strict";

/* Add and remove the Nav on scroll */
function addtdv() {
    document.querySelectorAll("section").forEach(section => section.classList.add('tdv'));
}

function remtdv() {
    document.querySelectorAll("section").forEach(section => section.classList.remove('tdv'));
}

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