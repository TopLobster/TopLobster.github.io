"use strict";

function fadeInBanner() {
    let banner = document.querySelector('#banner');
    banner.classList.add('rem-transition');
    banner.classList.remove('fade-in');
    setTimeout(() => {
        banner.classList.remove('rem-transition');
        banner.classList.add('fade-in');
    }, 1000);
    return 1;
}

/* Add and remove the Nav on scroll */
function addtdv() {
    document.querySelectorAll("section").forEach(section => section.classList.add('tdv'));
    document.querySelector('.tdv-button').style.transform = 'translateY(-3rem)';
}

function remtdv() {
    document.querySelectorAll("section").forEach(section => section.classList.remove('tdv'));
    document.querySelector('.tdv-button').style.transform = 'translateY(0)';
}

function addNav() {
    document.querySelector(".global-nav.fixed").style.transform = "translate(0,3.5rem)";
}

function remNav() {
    document.querySelector(".global-nav.fixed").style.transform = "translate(0,0rem)";
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

const observeProject = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            // .. do something
            if (entry.isIntersecting) {
                entry.target.classList.add("proj-move");
                observer.disconnect();
            }
        });
    });
    io.observe(target);
};

document.querySelectorAll('.project-observer').forEach(project => {
    observeProject(project);
    project.classList.remove('proj-move');
});

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

function enableDarkTheme() {
    fadeInBanner();
    document.querySelector('#theme').setAttribute('href', 'css/dark-theme.css');
    document.querySelector('#unsplash').setAttribute('href', 'https://unsplash.com/@n8rayfield');
}

function enableLightTheme() {
    fadeInBanner();
    document.querySelector('#theme').setAttribute('href', 'css/light-theme.css');
    document.querySelector('#unsplash').setAttribute('href', 'https://unsplash.com/@benkleaphoto');
}

document.querySelector('#dark-button').addEventListener('click', () => enableDarkTheme());
document.querySelector('#light-button').addEventListener('click', () => enableLightTheme());

window.onload = () => {
    /* Load in images later */
    fadeInBanner();
    document.querySelectorAll('.proj-img').forEach((img) => {
        img.style.backgroundImage = 'url("' + img.getAttribute('src-lazy') + '")';
    });
};