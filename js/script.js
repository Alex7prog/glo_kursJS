//******* Lesson 23 **********************************************

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
				if (idInterval) { clearInterval(idInterval); }
			}
		}

		//1-й вариант
		updateClock();

	} // end countTimer

	const timeDeadline = '22 december 2020';

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

	ScrollToServiceBlock();

	// Menu
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', handlerMenu);

		menu.addEventListener('click', event => {
			const target = event.target;

			if (target.matches('.close-btn')) {
				handlerMenu();
			} else {
				if (target.tagName === 'A') {
					scrollToHrefSmooth(event);
					handlerMenu();
				}
			}
		});
	}; //end toggleMenu

	toggleMenu();

	// PopUp
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			//popupClose = document.querySelector('.popup-close'),
			popupContent = document.querySelector('.popup-content');

		let moveInterval,
			step = 0,
			count;
		const startPopUpTranslateX = -603,
			endPopUpTranslateX = -50;

		const handlerPopUp = () => {
			popup.style.display = 'block';

			if (screen.width >= 768) {
				moveInterval = requestAnimationFrame(handlerPopUp);

				step++;
				count = startPopUpTranslateX + step * 20;

				if (count < endPopUpTranslateX) {
					popupContent.style.transform = `translateX(${count}px)`;
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

		popup.addEventListener('click', event => {

			let target = event.target;
			if (target.matches('.popup-close')) {
				handlerPopUpBack();
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					handlerPopUpBack();
				}
			}
		});
	}; // end togglePopUp

	togglePopUp();

	// Tabs
	const tabs = () => {
		const tabHeader =  document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	}; // end tabs

	tabs();

	//Slider
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			//btn = document.querySelectorAll('portfolio-btn'),
			portfolioDots = document.querySelector('.portfolio-dots'),
			//dot = document.querySelectorAll('.dot'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval;
		// создание и добавление <li class="dot"></li>
		for (let i = 0; i < slide.length; i++) {
			const liDot = document.createElement('li');
			liDot.className = 'dot';
			portfolioDots.appendChild(liDot);
		}

		const dot = document.querySelectorAll('.dot');
		dot[0].classList.add('dot-active');

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 1500) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
				if (currentSlide >= slide.length) {
					currentSlide = 0;
				}
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
				if (currentSlide < 0) {
					currentSlide = slide.length - 1;
				}
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn, .dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn, .dot')) {
				startSlide();
			}
		});

		startSlide();
	};

	slider();

	// Team photo
	const photoTeam = () => {
		const command = document.getElementById('command');

		command.addEventListener('mouseover', event => {
			const target = event.target;

			target.dataset.imgSrcStore = target.src;
			target.src = target.dataset.img;
		});

		command.addEventListener('mouseout', event => {
			const target = event.target;

			target.src = target.dataset.imgSrcStore;
		});
	};

	photoTeam();

	// Calculator
	const calcValidate = () => {
		const calcBlock = document.querySelector('.calc-block');

		calcBlock.addEventListener('input', event => {
			const target = event.target;

			target.value = target.value.replace(/[^\d]/g, '');
		});
	};

	calcValidate();

});

