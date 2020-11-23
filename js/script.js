/******************************************
        Lesson 03
*******************************************/
// используем строгий режим
'use strict';

// объявление переменных
let money = 10000; 
let income = 'freelance'; 
let addExpenses = 'Коммунальные платежи, Бензин, Интернет'; 
let deposit = true; 
let mission = 1000000000; 
let period = 6;

// типы переменных
console.log(
  `типы переменных:
  money: ${typeof(money)}
  income: ${typeof(income)}
  addExpenses: ${typeof(addExpenses)}
  `);

// длина строки
console.log('длина строки addExpenses: ', addExpenses.length);
console.log('\n');

// используем конкатенацию строк
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log('\n');

// приводим строку к нижнему регистру и разбиваем на массив
console.log('массив полученный из строки addExpenses: ', addExpenses.toLowerCase().split(', '));
console.log('\n');

// ********** функционал lesson03 ***************************************************************

// запрос размера месячного дохода пользователя - money
money = Number(prompt('Укажите Ваш месячный доход: ')); 

// запрос у пользователя возможных расходов
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');

// запрос у пользователя о банковском депозите
deposit = Boolean(confirm('Есть ли у вас депозит в банке?: '));

// запрос у пользователя 
let expenses1 = prompt('Введите обязательную 1-ю статью расходов: ');
let amount1 = Number(prompt(`Во сколько обойдутся ${expenses1} ?: `));
let expenses2 = prompt('Введите обязательную 2-ю статью расходов: ');
let amount2 = Number(prompt(`Во сколько обойдутся ${expenses2} ?: `));

// вычисляем бюджет на месяц и выводим в консоль
let budgetMonth = money - amount1 - amount1;
console.log('Бюджет на месяц: ', budgetMonth);

// вычисляем срок достижения цели mission
// выводим в консоль, округляя в большую сторону
console.log('Цель будет достигнута за: ' + Math.ceil(mission / budgetMonth) + ' (месяц/месяцев)');

// вычисляем средний бюджет на день 
// выводим в консоль, округляя в меньшую сторону
let budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

// определяем уровень дохода
switch (true) {
  case (budgetDay >= 1200):
    console.log('У вас высокий уровень дохода');
    break;
  case (budgetDay >= 600 && budgetDay < 1200):
    console.log('У вас средний уровень дохода');
    break;
  case (budgetDay >= 0 && budgetDay < 600):
    console.log('К сожалению у вас уровень дохода ниже среднего');
    break;
  default:
    console.log('Что то пошло не так');
    break;
}


