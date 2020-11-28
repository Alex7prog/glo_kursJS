/******************************************
                Lesson 07
*******************************************/
// используем строгий режим
'use strict';

let money,
    start = function () {
      do {
        money = +prompt('Укажите Ваш месячный доход: ', 50000);  
      } while (!isNumber(money));
    };

let appData = {
    
    income: {},
    addIncome: [],
    
    expenses: {},
    addExpenses: [],
    
    deposit: false,
    mission: 800000000,
    period: 6,
    
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function(){

      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ', 'Топливо, Коммунальные расходы, Обучение');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          
          appData.deposit = Boolean(confirm('Есть ли у вас депозит в банке?: '));

          let q1, q2;
          for (let i = 1; i < 3; i++) {
            q1 = prompt('Введите обязательную ' + i  + '-ю статью расходов: ');
            
            if (q1 !== null) {
    
              do {
                q2 = prompt(`Во сколько обойдутся ${q1} ?: `);
              } while (!isNumber(q2));
        
              appData.expenses[q1] = +q2;
            }
          } 
      //console.log(appData.expenses);
    },
    //подсчет обязательных месячных расходов
    getExpensesMonth: function () {

      for (const key in appData.expenses) {
        appData.expensesMonth += appData.expenses[key]; 
      }

    },
    // бюджет месяц/день (доходы - расходы)  
    getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30;

    },
    // подсчет срока достижения цели
    getTargetMonth: function () {

      //Math.ceil(appData.mission / appData.budgetMonth);

      return Math.ceil(appData.mission / appData.budgetMonth);;

    },
    // определение уровня доходов
    getStatusIncome: function () {
      switch (true) {
        case (appData.budgetDay >= 1200):
          return 'У вас высокий уровень дохода';
          //break;
        case (appData.budgetDay >= 600):
          return 'У вас средний уровень дохода';
          //break;
        case (appData.budgetDay >= 0):
          return 'К сожалению у вас уровень дохода ниже среднего';
          //break;
        default:
          return 'Что то пошло не так';
      }
    }

  }; // end of appData{}

// запрос размера месячного дохода пользователя - money
start();

// запросы пользователю:
//   возможных расходов
//   о банковском депозите
//   сумм обязательных расходов и подсчет их суммы
appData.asking();

// вызов методов объекта для подсчета данных
appData.budget = money;
appData.getExpensesMonth();
appData.getBudget();


// расчетные данные
console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Период достижения цели (в месяцах):', appData.getTargetMonth());
console.log('Уровень дохода: ', appData.getStatusIncome());

// appData{}
console.log(`\nНаша программа включает в себя данные:`);
for (const key in appData) {
  console.dir(key + ': ' + appData[key]);
}


