'use strict';

import countTimer from './modules/counTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import photoTeam from './modules/photoTeam';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
const timeDeadline = '01 january 2022';

let idInterval = null;
countTimer(timeDeadline);

idInterval = setInterval(countTimer, 1000, timeDeadline);

// scroll to page
const scrollToHrefSmooth = event => {
    const target = event.target.closest('a'),
        page = document.querySelector(target.getAttribute('href'));
    event.preventDefault();
    page.scrollIntoView({ behavior: "smooth" });
};
// btn scroll to Serviceblock
const ScrollToServiceBlock = () => {
    const serviceBlockBtn = document.querySelector('[href="#service-block"]');

    serviceBlockBtn.addEventListener('click', event => {
        scrollToHrefSmooth(event);
    });
};
//ScrollToServiceBlock();

// Menu
toggleMenu();
// PopUp
togglePopUp();
// Tabs
tabs();
//Slider
slider();
// Team photo
photoTeam();
// Calculator
calc(100);
//send-ajax-form
sendForm();
