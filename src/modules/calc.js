const calc = (price = 100)  => {

	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcCount = document.querySelector('.calc-count'),
		calcDay = document.querySelector('.calc-day'),
		totalValue = document.getElementById('total');

	calcBlock.addEventListener('input', event => {

		const target = event.target;
		if (target.matches('input')) {
			target.value = target.value.replace(/[^\d]/g, '');
		}
	});

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;

		const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;

		if (calcType.selectedIndex === 0) {
			calcSquare.value = '';
			calcCount.value = '';
			calcDay.value = '';
			totalValue.textContent = '';
			return;
		}

		if (calcCount.value && calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = Math.floor(price * typeValue * squareValue * +countValue * dayValue);
		}

		let counter = +totalValue.textContent,
			step = Math.floor((Math.abs(total - counter) / 10)),
			requestId;

		const animateCountSum = () => {

			if (counter < total) {
				counter += step;
				if (counter > total) { counter = total; }
			} else if (counter > total) {
				counter -= step;
				if (counter < 0) { counter = 0; }
			}

			totalValue.textContent = counter;

			if (counter === total) {
				cancelAnimationFrame(requestId);
				return;
			}
			requestAnimationFrame(animateCountSum);
		};
		if (total !== 0) {
			requestId = requestAnimationFrame(animateCountSum);
		}
	};// end countSum()

	calcBlock.addEventListener('change', () => {
		countSum();
	});

}; // end calc()

export default calc;
