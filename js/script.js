/******************************************
        Lesson 04
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


// запросы пользователю:
// запрос размера месячного дохода пользователя - money
money = Number(prompt('Укажите Ваш месячный доход: ')); 
// запрос у пользователя возможных расходов
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');
// запрос у пользователя о банковском депозите
deposit = Boolean(confirm('Есть ли у вас депозит в банке?: '));
// запрос у пользователя сумм обязательных расходов
let expenses1 = prompt('Введите обязательную 1-ю статью расходов: ');
let amount1 = Number(prompt(`Во сколько обойдутся ${expenses1} ?: `));
let expenses2 = prompt('Введите обязательную 2-ю статью расходов: ');
let amount2 = Number(prompt(`Во сколько обойдутся ${expenses2} ?: `));

// вывод в консоль типов переменных
showTypeOf(money); 
showTypeOf(income); 
showTypeOf(addExpenses); 

// расходы за месяц
console.log('расходы за месяц:', getExpensesMonth(amount1, amount2));

// возможные расходы в виде массива
console.log('возможные расходы:', addExpenses.split(', '));

// чистый доход
let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

// срок достижения цели в месяцах
console.log('срок достижения цели:', getTargetMonth(accumulatedMonth, mission), 'месяцев');

// бюджет на день
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('бюджет на день:', budgetDay);

// определение уровня доходов
console.log('уровень доходов:', getStatusIncome(budgetDay));