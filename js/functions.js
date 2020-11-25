/******************************************
       Functions
*******************************************/

// используем строгий режим
'use strict';

// определение функций:
// функция вывода в консоль типа переменной
let showTypeOf = function (data) {
  console.log(data + ': ' + typeof(data));
}
// функция подсчета обязательных месячных расходов
function getExpensesMonth(expenses1, expenses2) {
  let sumExpensesMonth = expenses1 + expenses2;
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
      //return 'Что то пошло не так';
  }
}
