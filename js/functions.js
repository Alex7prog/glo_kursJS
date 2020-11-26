/******************************************
       Functions
*******************************************/

// используем строгий режим
'use strict';

// определение функций:

// функция определения значения на число
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
// функция вывода в консоль типа переменной
let showTypeOf = function (data) {
  console.log(data + ': ' + typeof(data));
}

// функция запроса начальных данных - месячный доход
function start() {
  money = +prompt('Укажите Ваш месячный доход: ');

  while (!isNumber(money)) {
    money = +prompt('Укажите Ваш месячный доход: ');
  }
}
// функция запроса у пользователя и подсчета обязательных месячных расходов
function getExpensesMonth() {
  let sum,
      sumExpensesMonth =0,
      expenses = '';

  for (let i = 1; i < 3; i++) {
    expenses = prompt('Введите обязательную ' + i  + '-ю статью расходов: ');
   
    if (expenses !== null) {
      sum = prompt(`Во сколько обойдутся ${expenses} ?: `);
 
      while (!isNumber(sum)) {
        sum = prompt(`Во сколько обойдутся ${expenses} ?: `);
      }

      sumExpensesMonth += +sum;
    }
  }    

  return sumExpensesMonth;

}
// функция подсчета суммы накоплений за месяц 
function getAccumulatedMonth(income, expenses) {
  let sumAccumulatedMonth = income - expenses;
  return sumAccumulatedMonth;
}
// функция подсчета срока достижения цели
function getTargetMonth(sumMonth, sumMission) {
  let TargetMonth = Math.ceil(sumMission / sumMonth);
  return TargetMonth;
}
// функция определения уровня доходов
function getStatusIncome(sumDay) {
  switch (true) {
    case (sumDay >= 1200):
      return 'У вас высокий уровень дохода';
      //break;
    case (sumDay >= 600):
      return 'У вас средний уровень дохода';
      //break;
    case (sumDay >= 0):
      return 'К сожалению у вас уровень дохода ниже среднего';
      //break;
    default:
      return 'Что то пошло не так';
  }
}
