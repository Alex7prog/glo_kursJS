'use strict';

class SliderCarousel {
	constructor({
		main,
		wrap,
		next,
		prev,
		infinity = false,
		position = 0,
		slidesToShow = 3,
		responsive = []
	}) {
		if (!main || !wrap) {
			console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
		}
		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.slides = document.querySelector(wrap).children;
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
		this.slidesToShow = slidesToShow;
		this.options = {
			position,
			infinity,
			widthSlide: Math.floor(100 / this.slidesToShow),
			maxPosition: this.slides.length  - this.slidesToShow
		};
		this.responsive = responsive;
	}

	init() {
		this.addGloClass();
		this.addStyle();

		if (this.prev && this.next) {
			this.controlSlider();
		} else {
			this.addArrow();
			this.controlSlider();
		}
		if (this.responsive) {
			this.responseInit();
		}
	}

	addGloClass() {
		this.main.classList.add('glo-slider');
		this.wrap.classList.add('glo-slider_wrap');
		for (const item of this.slides) {
			item.classList.add('glo-slider_item');
		}
	}

	addStyle() {
		let style = document.getElementById('sliderCarousel-style');
		if (!style) {
			style = document.createElement('style');
			style.id = 'sliderCarousel-style';
		}
		style.textContent = `
			.glo-slider {
				overflow: hidden !important;
			}
			.glo-slider_wrap {
				display: flex !important;
				transition: transform 0.5s !important;
				will-change: transform !important;
			}
			.glo-slider_item {
				display: flex !important;
				align-items: center;
				justify-content: center;
				flex: 0 0 ${this.options.widthSlide}% !important;
				margin: auto 0 !important;
			}
		`;

		document.head.appendChild(style);
	}

	controlSlider() {
		this.prev.addEventListener('click', this.prevSlider.bind(this));
		this.next.addEventListener('click', this.nextSlider.bind(this));
	}

	prevSlider() {
		if (this.options.infinity || this.options.position > 0) {
			--this.options.position;
			if (this.options.position < 0) {
				this.options.position = this.options.maxPosition;
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
		}
	}

	nextSlider() {
		if (this.options.infinity || this.options.position < this.options.maxPosition) {
			++this.options.position;
			if (this.options.position > this.options.maxPosition) {
				this.options.position = 0;
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
		}
	}

	addArrow() {
		this.prev = document.createElement('button');
		this.next = document.createElement('button');

		this.prev.className = 'glo-slider_prev';
		this.next.className = 'glo-slider_next';

		this.main.appendChild(this.prev);
		this.main.appendChild(this.next);

		const style = document.createElement('style');
		style.textContent = `
			.glo-slider_prev,
			.glo-slider_next {
				margin: 0 10px;
				border: 20px solid transparent;
				background: transparent;
			}
			.glo-slider_next {
				border-left-color: #19b5fe;
			}
			.glo-slider_prev {
				border-right-color: #19b5fe;
			}
			.glo-slider_prev: hover,
			.glo-slider_next: hover,
			.glo-slider_prev: focus,
			.glo-slider_next: focus {
				background: transparent;
				outline: transparent;

			}
		`;

		document.head.appendChild(style);
	}

	responseInit() {
		const slidesToShowDefault = this.slidesToShow;
		const allResponse = this.responsive.map(item => item.breakpoint);
		const maxResponse = Math.max(...allResponse);

		const checkResponse = () => {
			const widthWindow = document.documentElement.clientWidth;

			if (widthWindow < maxResponse) {
				for (let i = 0; i < allResponse.length; i++) {
					if (widthWindow < allResponse[i]) {
						this.slidesToShow = this.responsive[i].slideToShow;
						this.options.widthSlide = Math.floor(100 / this.slidesToShow);
						this.addStyle();
					}
				}
			} else {
				this.slidesToShow = slidesToShowDefault;
				this.options.widthSlide = Math.floor(100 / this.slidesToShow);
				this.addStyle();
			}
		};

		checkResponse();

		window.addEventListener('resize', checkResponse);
	}

}
