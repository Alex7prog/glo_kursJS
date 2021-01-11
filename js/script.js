//******* Lesson 34  **************************************

'use strict';

//олимпийские кольца
const olimpicRings = () => {

	const radius = 50,
		thick = Math.floor(radius / 5);

	const arrRings = [
		{ color: 'blue',   x: radius + thick, y: radius + thick },
		{ color: 'black',  x: 3 * radius + 3 * thick, y: radius + thick },
		{ color: 'red',    x: 5 * radius + 5 * thick, y: radius + thick },
		{ color: 'yellow', x: 2 * radius + 2 * thick, y: 2 * radius + thick },
		{ color: 'green',  x: 4 * radius + 4 * thick, y: 2 * radius + thick }
	];

	const canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d');

	canvas.width = radius * 6 + thick * 6;
	canvas.height = radius * 3 + thick * 2;
	canvas.style.border = 'solid 1px lightgrey';

	document.body.appendChild(canvas);

	const angle = (degrees = 360) => (Math.PI / 180) * degrees;

	ctx.lineWidth = thick;

	arrRings.forEach(element => {
		ctx.beginPath();
		ctx.moveTo(element.x + radius, element.y);
		ctx.strokeStyle = element.color;
		ctx.arc(element.x, element.y, radius, 0, Math.PI * 2, false);
		ctx.stroke();
	});

	ctx.strokeStyle = arrRings[0].color;
	ctx.beginPath();
	ctx.arc(arrRings[0].x, arrRings[0].y, radius, angle(-15), angle(15), false);
	ctx.stroke();

	ctx.strokeStyle = arrRings[1].color;
	ctx.beginPath();
	ctx.arc(arrRings[1].x, arrRings[1].y, radius, angle(-15), angle(15), false);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(arrRings[1].x, arrRings[1].y, radius, angle(90), angle(120), false);
	ctx.stroke();

	ctx.strokeStyle = arrRings[2].color;
	ctx.beginPath();
	ctx.arc(arrRings[2].x, arrRings[2].y, radius, angle(90), angle(120), false);
	ctx.stroke();
};

// рисовалка (выбор цвета и толщины пера)
const paint = () => {
	const canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d');

	canvas.width = 600;
	canvas.height = 400;
	canvas.style.border = 'solid 1px lightgrey';
	canvas.style.display = 'block';
	canvas.style.marginBottom = '5px';
	document.body.appendChild(canvas);

	const color = document.createElement('input');
	color.type = 'color';
	document.body.appendChild(color);

	const thickLine = document.createElement('input');
	thickLine.type = 'number';
	thickLine.setAttribute('min', 1);
	thickLine.setAttribute('max', 10);
	thickLine.value = 5;
	thickLine.style.cssText = 'vertical-align: top; height: 21px; margin: 0 10px;';
	document.body.appendChild(thickLine);

	ctx.lineWidth = 5;

	thickLine.addEventListener('change', event => ctx.lineWidth = event.target.value);

	color.addEventListener('input', () => ctx.strokeStyle = color.value);

	canvas.addEventListener('mousemove', event => {
		const x = event.offsetX,
			y = event.offsetY,
			mx = event.movementX,
			my = event.movementY;

		if (event.buttons > 0) {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x - mx, y - my);
			ctx.stroke();
			ctx.closePath();
		}
	});
};

olimpicRings();

paint();

