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

	popup.addEventListener('submit', event => {
		event.preventDefault();
		setTimeout(handlerPopUpBack, 5000);
	});

}; // end togglePopUp()

export default togglePopUp;
