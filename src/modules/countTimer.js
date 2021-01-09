// Timer
function countTimer(deadline, idInterval) {
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
			if (idInterval) { clearInterval(idInterval); }
		}
	}

	//1-й вариант
	updateClock();

} // end countTimer

export default countTimer;
