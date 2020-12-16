/******************************************
        Lesson 18
*******************************************/

window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	// Timer
	function countTimer(deadline) {
		const timerHours = document.querySelector('#timer-hours'),
				timerMinutes  = document.querySelector('#timer-minutes'),
				timerSeconds = document.querySelector('#timer-seconds');
		
		function format2Number(num) {
			num < 10 ? num = '0' + num : num = num.toString();
			return num;
		}

		function getTimeRemaining() {
			let	dateStop = new Date(deadline).getTime(),
					dateNow = new Date().getTime(),
					timeRemaining = (dateStop - dateNow) / 1000,
					seconds = Math.floor(timeRemaining % 60),
					minutes = Math.floor((timeRemaining / 60) % 60),
					hours = Math.floor(timeRemaining / 60 / 60);

			return {timeRemaining, hours, minutes, seconds};
		}

		function updateClock() {
			let timer = getTimeRemaining();

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
		//updateClock();

		// 2-й вариант
		const idInterval = setInterval(updateClock, 1000);

	}


	// 1-й вариант
	//const idInterval = setInterval(countTimer, 1000, '20 december 2020');

	// 2-й вариант
	countTimer('17 december 2020');


});

