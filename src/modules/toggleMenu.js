// Menu
const toggleMenu = () => {

	const menu = document.querySelector('menu');

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
