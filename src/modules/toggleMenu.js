// Menu
const toggleMenu = () => {

	const menu = document.querySelector('menu');

	// scroll to page
	const scrollToHrefSmooth = event => {
		const target = event.target.closest('a'),
			page = document.querySelector(target.getAttribute('href'));
		event.preventDefault();
		page.scrollIntoView({ behavior: "smooth" });
	};

	// btn scroll to Serviceblock
	const serviceBlockBtn = document.querySelector('[href="#service-block"]');
	serviceBlockBtn.addEventListener('click', event => {
		scrollToHrefSmooth(event);
	});

	const handlerMenu = () => {
		menu.classList.toggle('active-menu');
	};

	document.addEventListener('click', event => {
		const target = event.target;

		if (event.target.closest('menu')) {

			if (target.matches('.close-btn')) {
				handlerMenu();
			} else {
				if (target.tagName === 'A') {
					scrollToHrefSmooth(event);
					handlerMenu();
				}
			}
		} else if (menu.classList.contains('active-menu')) {
			handlerMenu();
		}

		if (target.closest('.menu')) {
			handlerMenu();
		}
	});

}; //end toggleMenu()

export default toggleMenu;
