/******************************************
                Lesson 09
*******************************************/
// используем строгий режим
'use strict';

let money,
    start = function () {
      do {
        money = +prompt('Укажите Ваш месячный доход: ', 50000);  
      } 
      while (!isNumber(money));
    };

let appData = {
    
    income: {},
    addIncome: [],
    
    expenses: {},
    addExpenses: [],
    
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 800000000,
    period: 6,
    
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function(){
      // дополнительный заработок
      if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
        let itemIncome;
        do {
          itemIncome = prompt('Какой у Вас дополнительный заработок: ', 'Такси');
        } while (!isString(itemIncome));
        let cashIncome;
        do {
          cashIncome = prompt('Сколько Вы в месяц на этом зарабатываете?: ', 10000);
        } while (!isNumber(cashIncome));
        appData.income[itemIncome] = cashIncome;
      }
      // возможные расходы
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ', 
                               'Топливо, Коммунальные расходы, Обучение');
      if (addExpenses !== null) {
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.addExpenses = appData.addExpenses.map( function(element) { return element.trim(); } );
      }
      
      //депозит есть/нет
      appData.deposit = Boolean(confirm('Есть ли у вас депозит в банке?: '));
      // обязательные расходы
      let itemExpenses, cashExpenses;
      for (let i = 1; i < 3; i++) {
        let itemExpenses;
        do {
          itemExpenses = prompt('Введите обязательную ' + i  + '-ю статью расходов: ', 'Обязательный расход ' + i);
        } while (!isString(itemExpenses));

        if (itemExpenses !== null) {
          let cashExpenses;
          do {
            cashExpenses = prompt(`Во сколько обойдутся ${itemExpenses} ?: `, 5000*i);
          } while (!isNumber(cashExpenses));
    
          appData.expenses[itemExpenses] = +cashExpenses;
        }
      } 
    }, // end of function asking()
    
    //подсчет обязательных месячных расходов
    getExpensesMonth: function () {
      for (const key in appData.expenses) {
        appData.expensesMonth += appData.expenses[key]; 
      }
    },
    // бюджет месяц/день (доходы - расходы)  
    getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // подсчет срока достижения цели
    getTargetMonth: function () {
      return Math.ceil(appData.mission / appData.budgetMonth);
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
    },
    // информация по депозиту
    getInfoDeposit: function() {
      if (appData.deposit) {
        do {
          appData.percentDeposit = prompt('Какой годовой процент депозита:?', 10);
        } while (!isNumber(appData.percentDeposit));
        do {
          appData.moneyDeposit = prompt('Какая сумма у Вас на депозите?: ', 10000);
        } while (!isNumber(appData.moneyDeposit));
      }
    },
    // доход за период
    calcSavedMoney: function() {
      return appData.budgetMonth * appData.period;
    }

  }; // end of appData{}

// элементы левой части интерфейса

// Месячный доход
let inputSalaryAmount = document.querySelector('.salary-amount');
// Дополнительный доход
let inputIncomeTitle = document.querySelectorAll('.income-title')[1];
let inputIncomeAmount = document.querySelector('.income-amount');
let btnPlusAddIncome = document.getElementsByTagName('button')[0];
// Возможный доход
let inputAddIncomeItem = document.querySelectorAll('.additional_income-item');
// Обязательные расходы
let inputExpensesTitle = document.querySelectorAll('.expenses-title')[1];
let inputExpensesAmount = document.querySelector('.expenses-amount');
let btnPlusAddExpenses = document.getElementsByTagName('button')[1];
// Возможные расходы
let inputAddExpensesItem = document.querySelector('.additional_expenses-item');
// чекбокс Депозит
let checkboxDeposit = document.querySelector('.deposit-checkmark');
// Цель (сумма)
let inputTargetAmount = document.querySelector('.target-amount');
// Период расчета
let inputPeriod = document.querySelector('.period-select');


// элементы правой части интерфейса - input

// Доход за месяц
let inputBudgetMonth = document.querySelector('.result-total budget_month-value');
//console.log('inputBudgetMonth: ', inputBudgetMonth);

//inputBudgetMonth.style.background ='blue';
// Дневной бюджет
let inputBudgetDay = document.getElementsByClassName('result-total budget_day-value')[0];

// Расход за месяц
let inputExpensesMonth = document.getElementsByClassName('result-total expenses_month-value')[0];
// Возможные доходы
let inputAddIncome = document.getElementsByClassName('result-total additional_income-value')[0];
// Возможные расходы
let inputAddExpenses = document.getElementsByClassName('result-total additional_expenses-value')[0];
// Накопления за период
let inputIncomePeriod = document.getElementsByClassName('result-total income_period-value')[0];
// Срок достижения цели в месяцах
let inputTargetMonth = document.getElementsByClassName('result-total target_month-value')[0];
// кнопка "Рассчитать"
let btnCalculateStart = document.getElementById("start");


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

if (appData.getTargetMonth() > 0) {
  console.log('Период достижения цели (в месяцах):', appData.getTargetMonth());
} else {
  console.log('Цель не будет достигнута');
}

console.log('Уровень дохода: ', appData.getStatusIncome());

// appData{}
console.log(`\nНаша программа включает в себя данные:`);
for (const key in appData) {
  console.dir(key + ': ' + appData[key]);
}

// Возможные расходы (addExpenses) выводим строкой в консоль 
//каждое слово с большой буквы слова разделены запятой и пробелом
let formatStr ='';

for (let i = 0; i < appData.addExpenses.length; i++) {
  formatStr = formatStr + ', ' + appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
}

console.log('formatStr: ', formatStr.slice(2));

