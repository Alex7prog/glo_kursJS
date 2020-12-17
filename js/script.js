/******************************************
        Lesson 18 part 2
*******************************************/
// Задание:
// Добрый день (утро, вечер, ночь в зависимости от времени суток)
// Сегодня: Понедельник
// Текущее время:12:05:15 PM
// До нового года осталось 175 дней

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const hello = document.createElement('div'),
		today = document.createElement('div'),
		currentTime = document.createElement('div'),
		remainNY = document.createElement('div');


	// Timer
	function helloDayTimer() {

		const dayNewYear = new Date('01 January 2021');

		// формат 0+число
		function format2Number(num) {
			num < 10 ? num = '0' + num : num = num.toString();
			return num;
		}
		// пересчет часов с 24 в am:pm
		function hoursAMPM(hours) {
			let hh = hours;
			if (hours >= 12) { hh = hours - 12; }
			if (hours === 0) { hh = 12; }
			return hh;
		}
		// время am или pm
		function indicatorAMPM(hours) {
			let strAMPM = 'AM';
			if (hours >= 12) { strAMPM = 'PM'; }
			return strAMPM;
		}
		// приветствие
		Date.prototype.timeDayHello = function() {
			let strTD = '',
				hours = this.getHours();

			switch (true) {
			case ((hours >= 0) && (hours < 6)):
				strTD = 'Доброй ночи';
				break;
			case ((hours >= 6) && (hours < 12)):
				strTD = 'Доброе утро';
				break;
			case ((hours >= 12) && (hours < 18)):
				strTD = 'Добрый день';
				break;
			case ((hours >= 18) && (hours < 24)):
				strTD = 'Добрый вечер';
				break;
			default:
				break;
			}

			return strTD;
		};
		// день недели прописью
		Date.prototype.weekDay = function() {
			let fDay = this.toLocaleString('ru', { weekday: 'long' });
			fDay = fDay.replace(fDay[0], fDay.charAt(0).toUpperCase());
			return fDay;
		};
		//форматирование текущего времени
		function getTimeEvent() {
			const todayDay = new Date();
			const helloDay = todayDay.timeDayHello(),
				dayWeek = todayDay.weekDay(),
				hoursDay = todayDay.getHours(),
				hh = format2Number(hoursAMPM(hoursDay)),
				mm = format2Number(todayDay.getMinutes()),
				ss = format2Number(todayDay.getSeconds()),
				ampm = indicatorAMPM(hoursDay),
				strCurrentTime = `${hh}:${mm}:${ss} ${ampm}`,
				timeNYRemaining = Math.floor((dayNewYear.getTime() - todayDay.getTime()) / 1000 / 60 / 60 / 24);

			return { helloDay, dayWeek, strCurrentTime, timeNYRemaining };
		}
		// вывод данных на страницу
		function updateClock() {
			const timer = getTimeEvent();

			hello.textContent = timer.helloDay;
			today.textContent = `Сегодня: ${timer.dayWeek}`;
			currentTime.textContent = `Текущее время: ${timer.strCurrentTime}`;
			remainNY.textContent = `До Нового Года осталось ${timer.timeNYRemaining} дней`;
		}

		updateClock();
	} //END of helloDayTimer()


	hello.setAttribute('id', 'hello');
	document.body.append(hello);

	today.setAttribute('id', 'today');
	document.body.append(today);

	currentTime.setAttribute('id', 'current-time');
	document.body.append(currentTime);

	remainNY.setAttribute('id', 'ny-remain');
	document.body.append(remainNY);

	const div = document.querySelectorAll('div');
	div.forEach(element => {
		element.setAttribute('style', 'font-style: italic; font-family: arial;');
	});

	setInterval(helloDayTimer, 1000);


});//END of window.addEventListener()

