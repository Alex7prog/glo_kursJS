const sendForm = () => {
	const errorMessage = 'Что-то пошло не так',
		loadMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const form1 = document.getElementById('form1'),
		form2 = document.getElementById('form2'),
		form3 = document.getElementById('form3');

	const statusMessage = document.createElement('div');

	const patternInputForm = new Map([
			['user_name', /[^А-яЁё\s]+$/],
			['user_email', /[^A-z0-9_@\.]/], // /[^[A-z0-9_@\.\S]+$/
			['user_phone', /[^+?\d]/],
			['user_message', /[^[А-яЁё\s\,\.\:\-\;\!\?]+$/]
		]),
		patternTestInputForm = new Map([
			['user_name', /[А-яЁё\s]+/],
			['user_email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/],
			['user_phone', /^\+?\d+$/],
			['user_message', /[А-яЁё\s\,\.\:\-\;\!\?]/]
		]),
		titleInputForm = new Map([
			['user_name', 'Используйте ввод только кириллицы и пробелов.'],
			['user_email', 'Используйте латинские буквы, @ и точку'],
			['user_phone', 'Укажите номер телефона в формате: + 12 цифр или 12 цифр.'],
			['user_message', 'Используйте ввод только кириллицы, пробелов, цифр и знаков препинания.']
		]);


	statusMessage.style.cssText = 'font-size: 2rem; color: white;';

	// отправка данных формы на сервер
	const postData = (body) => fetch('./server.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	// подготовка данных формы
	const formDataPost = (event) => {
		event.preventDefault();
		const form = event.target,
			formInput = form.querySelectorAll('input');

		let formDataValid = true;

		formInput.forEach(elem => {
			if (!patternTestInputForm.get(elem.name).test(elem.value)) {
				const divError = document.createElement('div');
				formDataValid = false;

				divError.style.color = 'orangered';
				form.append(divError);
				divError.textContent = `Неверный формат данных. Введите "${elem.placeholder}" еще раз.`;
				elem.style.border = 'solid orangered';

				setTimeout(() => {
					elem.style.border = '';
				}, 3000);
				setTimeout(() => {
					divError.remove();
				}, 3000);
			} else {
				elem.style.border = 'solid green';
				setTimeout(() => {
					elem.style.border = '';
				}, 3000);
			}
		});

		if (!formDataValid) { return; }

		const formData = new FormData(form),
			body = {};

		formData.forEach((val, key) => {
			body[key] = val;
		});

		form.appendChild(statusMessage);
		statusMessage.textContent = loadMessage;

		postData(body)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('status network not 200');
				}
				statusMessage.textContent = successMessage;
				formInput.forEach(elem => elem.value = '');
			})
			.catch((error) => {
				statusMessage.textContent = errorMessage;
				console.error(error);
			});

		setTimeout(() => {
			statusMessage.remove();
		}, 4000);

	}; // end formDataPost()

	const validInputForm = function() {
		const pattern = patternInputForm.get(this.name);
		this.title = titleInputForm.get(this.name);

		if (this.name === 'user_phone') {
			if (this.value[0] === '+') {
				this.value = this.value.replace(pattern, '');
			} else if (this.value.length > 0) {
				this.value = '+' + this.value.replace(pattern, '');
			}
			if (this.value.length >= 13) {
				this.value = this.value.substr(0, 13);
			}
		} else {
			this.value = this.value.replace(pattern, '');
		}
	};

	form1.setAttribute('novalidate', true);
	form1.addEventListener('submit', formDataPost);

	form2.setAttribute('novalidate', true);
	form2.addEventListener('submit', formDataPost);

	form3.setAttribute('novalidate', true);
	form3.addEventListener('submit', formDataPost);

	document.addEventListener('click', event => {
		const target = event.target;

		if (patternInputForm.has(target.name)) {
			target.closest('form').querySelector(`[name="${target.name}"]`)
				.addEventListener('input', validInputForm);
		}
	});

}; //end sendForm()

export default sendForm;
