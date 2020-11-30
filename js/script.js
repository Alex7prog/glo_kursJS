/******************************************
                Lesson 07
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
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
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

