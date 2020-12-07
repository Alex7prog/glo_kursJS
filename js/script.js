/******************************************
                Lesson 11 advanced
*******************************************/
// используем строгий режим
'use strict';

let btnStart = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    btnPlusExpenses = btnPlus[1],
    btnPlusIncome = btnPlus[0],
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    checkDeposit = document.querySelector('.deposit-checkmark'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.querySelector('.additional_expenses-value'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelectorAll('.income-title'),
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpenses = document.getElementsByClassName('additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),

    inputPlaceholderName = document.querySelectorAll('[placeholder="Наименование"]'),
    inputPlaceholderSum = document.querySelectorAll('[placeholder="Сумма"]');

let appData = {

    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    
    income: {},
    incomeMonth: 0,
    addIncome: [],
    
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    // расчеты и вывод результатов в форму по кнопке Рассчитать
    start: function() {

      appData.budget = +salaryAmount.value;

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();

      appData.showResult();
    },
    //вывод результатов в форму
    showResult: function() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      addExpensesValue.value = appData.addExpenses.join(', ');
      addIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      incomePeriodValue.value = appData.calcPeriodSavedMoney();
    },
    // обязательные расходы - добавление новых
    addExpensesBlock: function() {
      // проверка на пустые поля данных
      let inputEmpty = false;
      
      expensesItems.forEach(function(item) {
        if ((item.querySelector('.expenses-title').value === '') || 
            (item.querySelector('.expenses-amount').value === '')) {
              console.log('item.querySelector(.expenses-amount): ', item.querySelector('.expenses-amount'));
              inputEmpty = true;
            }
      });
      console.log('expensesItems: ', expensesItems);
      if (!inputEmpty) {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        // очищаем значения нового элемента полученных при клонировании
        cloneExpensesItem.querySelector('.expenses-title').value = '',
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items')
        console.log('expensesItems: ', expensesItems);
        
        if  (expensesItems.length === 3) {
          btnPlusExpenses.style.display = "none";
        }

        // валидация данных
          expensesItems[expensesItems.length-1].
            querySelector('[placeholder="Сумма"]').addEventListener('keyup', function(){
              this.value = this.value.replace(/[^\d]/g, '');
            });
          expensesItems[expensesItems.length-1].
            querySelector('[placeholder="Наименование"]').addEventListener('keyup', function(){
              this.value = this.value.replace(/[^[А-Яа-яЁё\s\,\.\:\-\;]+$/g, '');
            });

          } else {
        alert('Есть не заполненные поля. Введите данные');
           
      }
    },
    // обязательные расходы
    getExpenses: function() {
      expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value,
          cashExpenses = item.querySelector('.expenses-amount').value;

      if ((itemExpenses !== '') && (cashExpenses !== '')) {
        appData.expenses[itemExpenses] = cashExpenses;
      }
      });
    },
    // дополнительный доход - добавление нового
    addIncomeBlock: function() {
      // проверка на пустые поля данных
      let inputEmpty = false;
      incomeItems.forEach(function(item) {
        if ((item.querySelector('.income-title').value === '') || 
            (item.querySelector('.income-amount').value === '')) {
              inputEmpty = true;
        }
      })
      
      if (!inputEmpty) {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        // очищаем значения нового элемента полученных при клонировании
        cloneIncomeItem.querySelector('.income-title').value = '',
        cloneIncomeItem.querySelector('.income-amount').value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
        incomeItems = document.querySelectorAll('.income-items')

        if  (incomeItems.length === 3) {
          btnPlusIncome.style.display = "none";
        }
        
        // валидация данных
        incomeItems[incomeItems.length-1].
        querySelector('[placeholder="Сумма"]').addEventListener('keyup', function(){
          this.value = this.value.replace(/[^\d]/g, '');
        });
        incomeItems[incomeItems.length-1].
        querySelector('[placeholder="Наименование"]').addEventListener('keyup', function(){
          this.value = this.value.replace(/[^[А-Яа-яЁё\s\,\.\:\-\;]+$/g, '');
        });


      } else {
        alert('Есть не заполненные поля. Введите данные');
      }
    },
    // дополнительный доход
    getIncome: function() {
      incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value,
          cashIncome = item.querySelector('.income-amount').value;

      if ((itemIncome !== '') && (cashIncome !== '')) {
        appData.income[itemIncome] = cashIncome;
      }
      });

      for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
    },
    // возможные расходы
    getAddExpenses: function() {
      let addExpenses = addExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
        if (item !== '') {
          appData.addExpenses.push(item.trim());
        }
      });
    },
    // возможный доход
    getAddIncome: function() {
      addIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      })
    },
    //подсчет обязательных месячных расходов
    getExpensesMonth: function () {
      for (const key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key]; 
      }
    },
    // бюджет месяц/день (доходы - расходы)  
    getBudget: function () {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // подсчет срока достижения цели
    getTargetMonth: function () {

      return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    // проверка ввода значения - Месячный доход
    checkSalaryAmountValue: function() {
      if ((salaryAmount.value !== '') && isNumber(salaryAmount.value)) {
        btnStart.addEventListener('click', appData.start);
      } else {
        btnStart.removeEventListener('click', appData.start);
      }
    },
    // индикатор Период расчета
    showPeriodValue: function() {
      periodAmount.textContent = periodSelect.value;
    },
    // доход за период
    calcPeriodSavedMoney: function() {
      if (appData.budget !== 0){
        return (incomePeriodValue.value = appData.budgetMonth * periodSelect.value);
      }
    }

  }; // end of appData{}

// события
salaryAmount.addEventListener('input', appData.checkSalaryAmountValue);

btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);

btnPlusIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.showPeriodValue);

periodSelect.addEventListener('input', appData.calcPeriodSavedMoney);

// разрешен ввод только цифр
inputPlaceholderSum.forEach(function(item) {
  item.addEventListener('keyup', function(event){
    this.value = this.value.replace(/[^\d]/g, '');
    event.preventDefault();
    });
  });


// разрешен ввод кириллицы, пробелов, знаков припинания
inputPlaceholderName.forEach(function(item) {
  item.addEventListener('keyup', function(){
    this.value = this.value.replace(/[^[А-Яа-яЁё\s\,\.\:\-\;]+$/g, ''); 
  });
});


