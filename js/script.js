//******* Lesson 27  **************************************

// скрипт <script src="js/script.js" defer></script>
// указан параметр defer - подключен асинхронно и будет дожидаться полной загрузки html

// стрелочная функция возвращающая массив найденных элементов
// в values соответствующих типу type
// с помощью спред оператора ...values преобразуем values в массив элементов строки values
// метод filter перебирает каждый элемент массива и возвращает в итоге массив значений
// тип которых соответствует параметру type, согласно условию typeof value === type
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	// стрелочная функция скрывает все блоки в которые выводится результат поиска (.dialog__response-block) 
	hideAllResponseBlocks = () => {
		// помещаем в массив responseBlocksArray все элементы страницы с классом dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// циклом forEach перебираем все элементы массива и скрываем их
		// с помощью свойства стиля display со значением none
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	// стрелочная функция скрывает все блоки в которые выводится результат поиска (.dialog__response-block) 
	// и показывает нужный нам блок с классом .dialog__response-block
	// и классом blockSelector
	// и помещает в <span> c id spanSelector сообщение для пользователя msgText
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// стрелочная функция уведомления пользователя при возникновении ошибки 
	// в результате анализа типов данных в строке 
	// с помощью вызова функции showResponseBlock в которую предаем параметр msgText
	// функция showResponseBlock принимает параметры:
	// 		<div> с классом .dialog__response-block_error (красный оттенок)
	//		msgText - сообщение пользователю
	//		#error - id <span> в который помещен #msgText - Ошибка: ReferenceError: ап is not defined
	// блок с классом .dialog__response-block_error становится видимым (style="display: block;")
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// стрелочная функция уведомления пользователя при получении результата анализа типов данных в строке 
	// с помощью вызова функции showResponseBlock в которую предаем параметр msgText
	// функция showResponseBlock принимает параметры:
	// 		<div> с классом .dialog__response-block_ok (зеленый оттенок)
	//		msgText - сообщение пользователю
	//		#ok - id <span> в который помещен #msgText - Данные с типом number: ....
	// блок с классом .dialog__response-block_o становится видимым (style="display: block;")
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	
	// стрелочная функция уведомления пользователя при пустой строке ввода
	// с помощью вызова функции showResponseBlock 
	// переданный в функцию showResponseBlock параметр <div> с классом .dialog__response-block_no-results
	// блок с классом .dialog__response-block_no-results становится видимым (style="display: block;")
	// пользователь видит сообщение - Пока что нечего показать.
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// стрелочная функция, принимает параметры
	//  	type - выбранный пользователем тип данных который ищем в строке
	// 		values - строка которую анализируем на наличие выбранного типа данных 
	tryFilterByType = (type, values) => {
		// скрипт который выполнится если в нем не возникнет ошибки
		// тогда отработает блок catch
		try {
			// определяем константу строку valuesArray
			// которой присваиваем результат вычисления строки кода с помощью функции // eval и с помощью join помещаем найденные, сответствующие выбранному типу,
			// данные, разделенные запятой и пробелом
			// в строке кода находится функция filterByType которая возвращает 
			// соответствующие указанному типу данных (type) найденные в строке значения values
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// используем тернарный оператор
			// если значения найдены (длина строки valuesArray больше 0) 
			// 		alertMsg присваиваем строку -`Данные с типом ${type}: ${valuesArray}`
			// иначе (длина строки valuesArray = 0)
			// 		alertMsg присваиваем строку -`Отсутствуют данные типа ${type}`
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			// вызываем функцию showResults, передаем параметр строку сообщения
			showResults(alertMsg);
		// блок catch выполняется при возникновении ошибки при выполнении скрипта
		// в блоке try 
		} catch (e) {
			// при возникновении ошибки в <div> .dialog__response-block_error
			// пользователь видит сообщение - Ошибка + системная ошибка 
			// которая помещается в переменную e при ошибке выполнения скрипта
			showError(`Ошибка: ${e}`);
		}
	};
//получаем по id #filter-btn кнопку "Фильтровать"
const filterButton = document.querySelector('#filter-btn');

// подвешиваем событие на кнопку "Фильтровать" по клику по ней, 
// при клике по кнопке запускаем следующую стрелочную функцию e => {}
// передаем в нее e - событие - клик 
filterButton.addEventListener('click', e => {
	// получаем по id <select> - выпадающий список выбора типа данных
	const typeInput = document.querySelector('#type');
	// получаем по id поля ввода строки наших данных <input>
	const dataInput = document.querySelector('#data');
	// если строка ввода ничего не содержит, = ''
	if (dataInput.value === '') {
		//c помощью мтода setCustomValidity 
		// устанавливаем всплывающую подсказку для поля ввода  dataInput
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// вызываем функцию, чтобы уведомить пользователя 
		//что нет данных соответственно нет результата
		showNoResults();
	} else {//данные в строке ввода приутствуют
		// подсказку к input очищаем, присваивая ей значение пустая строка -''
		dataInput.setCustomValidity('');
		// отменяем действие браузера по дефолту при отправке формы (submit)
		e.preventDefault();
		// вызываем функцию tryFilterByType и передаем в нее параметры:
		// 1) значение выбора типа из выпадающнго списка <select>
		// 2) значение <input>, строка в которой мы анализируем тип данных
		// с помощью .trim() удоляем пробелы вначале и конце строк ввода 
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
}); // end filterButton.addEventListener()
