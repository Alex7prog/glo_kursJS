/******************************************
             Lesson 19
*******************************************/

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	// Timer
	function countTimer(deadline) {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes  = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function format2Number(num) {
			return (num < 10) ? num = '0' + num : num = num.toString();
		}

		function getTimeRemaining() {
			const	dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);

			return { timeRemaining, hours, minutes, seconds };
		}

		function updateClock() {
			const timer = getTimeRemaining();

			if (timer.timeRemaining >= 0) {
				timerHours.textContent = format2Number(timer.hours);
				timerMinutes.textContent = format2Number(timer.minutes);
				timerSeconds.textContent = format2Number(timer.seconds);
			} else {
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
				clearInterval(idInterval);
			}
		}

		//1-й вариант
		updateClock();

	} // end countTimer

	const timeDeadline = '18 december 2020';

	countTimer(timeDeadline);

	const idInterval = setInterval(countTimer, 1000, timeDeadline);

	// Menu
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			// 1-й вариант - style
			// if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
			// 	menu.style.transform = `translate(0)`;
			// } else {
			// 	menu.style.transform = `translate(-100%)`;
			// }
			// 2-й вариант - преключение класса
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);

		// for (let i = 0; i < menuItems.length; i++) {
		// 	menuItems[i].addEventListener('click', handlerMenu);
		// }

		menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

	}; //end toggleMenu

	toggleMenu();

	// PopUp
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close'),
			popupContent = document.querySelector('.popup-content');

		let moveInterval,
			step = 0,
			count;
		const startPopUpTranslateX = -603,
			endPopUpTranslateX = -50;

		const handlerPopUp = () => {
			popup.style.display = 'block';

			if (screen.width > 768) {
				moveInterval = requestAnimationFrame(handlerPopUp);

				step++;
				count = startPopUpTranslateX + step * 20;

				if (count < endPopUpTranslateX) {
					popupContent.style.transform = `translateX(${count}px)`;
					//popupContent.style.left = `${count}px`;
				} else {
					cancelAnimationFrame(moveInterval);
					step = 0;
				}
			} else {
				popupContent.style.transform = `translateX(${endPopUpTranslateX}px)`;
			}
		};

		const handlerPopUpBack = () => {

			if (screen.width >= 768) {
				moveInterval = requestAnimationFrame(handlerPopUpBack);

				step++;
				count = endPopUpTranslateX - step * 20;

				if (count > startPopUpTranslateX) {
					popupContent.style.transform = `translateX(${count}px)`;
				} else {
					cancelAnimationFrame(moveInterval);
					popup.style.display = 'none';
					step = 0;
				}
			} else {
				popup.style.display = 'none';
				popupContent.style.transform = `translateX(${startPopUpTranslateX}px)`;
			}
		};


		popupBtn.forEach(elem => { elem.addEventListener('click', handlerPopUp); });

		popupClose.addEventListener('click', handlerPopUpBack);
	}; // end togglePopUp

	togglePopUp();

});

