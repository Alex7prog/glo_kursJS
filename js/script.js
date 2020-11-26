/******************************************
        Lesson 05
*******************************************/
// используем строгий режим
'use strict';

// объявление переменных
let money = 10000, 
    income = 'freelance', 
    addExpenses = 'Коммунальные платежи, Бензин, Интернет',
    deposit = true, 
    mission = 1000000000, 
    period = 6,
    expensesAmount;


// запросы пользователю:
// запрос размера месячного дохода пользователя - money
start();
// запрос у пользователя возможных расходов
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');
// запрос у пользователя о банковском депозите
deposit = Boolean(confirm('Есть ли у вас депозит в банке?: '));

// вывод в консоль типов переменных
showTypeOf(money); 
showTypeOf(income); 
showTypeOf(addExpenses); 

// запрос у пользователя сумм обязательных расходов и подсчет их суммы
expensesAmount = getExpensesMonth();
// расходы за месяц
console.log('расходы за месяц:', expensesAmount);
// возможные расходы в виде массива
console.log('возможные расходы:', addExpenses.split(', '));

// чистый доход
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

// срок достижения цели в месяцах
// getTargetMonth вернет отрицательно значение если accumulatedMonth < 0
accumulatedMonth > 0 ? 
  console.log('срок достижения цели:', getTargetMonth(accumulatedMonth, mission), 'месяцев')
  : console.log('цель не будет достигнута');

// бюджет на день
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('бюджет на день:', budgetDay);

// определение уровня доходов
console.log('уровень доходов:', getStatusIncome(budgetDay));