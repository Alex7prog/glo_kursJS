//******* Lesson 30  **************************************

'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import photoTeam from './modules/photoTeam';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
const timeDeadline = '11 january 2021';
let idInterval = null;
countTimer(timeDeadline, idInterval);
idInterval = setInterval(countTimer, 1000, timeDeadline);

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
