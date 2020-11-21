/******************************************
        Lesson 02
*******************************************/

// объявление переменных
let money = 10000; 
let income = '5000'; 
let addExpenses = 'Интернет, Коммуналка, Такси'; 
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
console.log('Период равен ' + 6 + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log('\n');

// приводим строку к нижнему регистру и разбиваем на массив
console.log('массив полученный из строки addExpenses: ', addExpenses.toLowerCase().split(', '));
console.log('\n');

// вычисляем дневной доход исходя из месячного дохода 
let budgetDay = money / 30;
console.log('дневной доход budgetDay: ', budgetDay.toFixed());
console.log('\n');
