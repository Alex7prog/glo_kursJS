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
}; //end slider()

export default slider;
