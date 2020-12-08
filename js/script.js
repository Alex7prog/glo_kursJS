/******************************************
                Lesson 13
*******************************************/
// используем строгий режим
'use strict';

let btnStart = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),
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

    inputCheck = document.querySelector('#deposit-check'),
    inputPeriod = document.querySelector('[type="range"]'),

    inputPlaceholderName = document.querySelectorAll('[placeholder="Наименование"],[placeholder="название"]'),
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
    
    appDataClear: function() {
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.expensesMonth = 0;
      this.addExpenses = [];
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      },

    // расчеты и вывод результатов в форму по кнопке Рассчитать
    start: function() {

      if ((salaryAmount.value == '') && !isNumber(salaryAmount.value)) {
        alert('Укажите Месячный доход!');
        return;
      }
      this.budget = +salaryAmount.value;

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();

      this.showResult();

      btnStart.style.display = 'none';
      btnCancel.style.display = 'block';
      //блок input левой части формы
      document.querySelectorAll('input').forEach( (item) => {
        item.disabled = true;
        });
    },
    
    //вывод результатов в форму
    showResult: function() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      addExpensesValue.value = this.addExpenses.join(', ');
      addIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
      incomePeriodValue.value = this.calcPeriodSavedMoney();
    },
    
    // исходное состояние программы
    reset: function() {
      // обнуляем свойства объекта
      this.appDataClear();
      //обнуляем значения левой часть формы
      salaryAmount.value = '';
      
      for (let i = 0; i < incomeItems.length-1; i++) {
        incomeItems[incomeItems.length-1-i].remove();
      }
      incomeItems[0].querySelector('.income-title').value = '',
      incomeItems[0].querySelector('.income-amount').value = '';
      btnPlusIncome.style.display = "block";

      for (let i = 0; i < addIncomeItem.length; i++) {
        addIncomeItem[i].value ='';
      }

      for (let i = 0; i < expensesItems.length-1; i++) {
        expensesItems[expensesItems.length-1-i].remove();
      }
      expensesItems[0].querySelector('.expenses-title').value = '',
      expensesItems[0].querySelector('.expenses-amount').value = '';
      btnPlusExpenses.style.display = "block";

      addExpensesItem.value ='';

      targetAmount.value ='';

      periodSelect.value = 1;
      periodAmount.textContent = '1';

      //обнуляем значения правой часть формы
      budgetMonthValue.value = null;
      budgetDayValue.value = null;
      expensesMonthValue.value = null;
      addExpensesValue.value = null;
      addIncomeValue.value = null;
      targetMonthValue.value = null;
      incomePeriodValue.value = null;

      btnStart.style.display = 'block';
      btnCancel.style.display = 'none';
      //разблокируем input левой части формы
      document.querySelectorAll('input').forEach( (item) => {
        item.disabled = false;
        });
    }, // END of reset: function()
    
    // обязательные расходы - добавление новых
    addExpensesBlock: function() {
      // проверка на пустые поля данных
      let inputEmpty = false;
      
      expensesItems.forEach(function(item) {
        if ((item.querySelector('.expenses-title').value === '') || 
            (item.querySelector('.expenses-amount').value === '')) {
              inputEmpty = true;
            }
      });
      if (!inputEmpty) {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        // очищаем значения нового элемента полученных при клонировании
        cloneExpensesItem.querySelector('.expenses-title').value = '',
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items')
        
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
      // 1й вариант) стрелочная функция, что бы использовать this
      expensesItems.forEach( (item) => {
      let itemExpenses = item.querySelector('.expenses-title').value,
          cashExpenses = item.querySelector('.expenses-amount').value;

      if ((itemExpenses !== '') && (cashExpenses !== '')) {
        this.expenses[itemExpenses] = cashExpenses;
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
      // 2й вариант) передаем аргумент, что бы использовать this
      incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value,
          cashIncome = item.querySelector('.income-amount').value;

      if ((itemIncome !== '') && (cashIncome !== '')) {
        this.income[itemIncome] = cashIncome;
      }
      // !!!
      }, this);

      for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
    },
    // возможные расходы
    getAddExpenses: function() {
      let addExpenses = addExpensesItem.value.split(',');
      addExpenses.forEach( (item) => {
        if (item !== '') {
          this.addExpenses.push(item.trim());
        }
      });
    },
    // возможный доход
    getAddIncome: function() {
      addIncomeItem.forEach( (item) => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          this.addIncome.push(itemValue);
        }
      })
    },
    //подсчет обязательных месячных расходов
    getExpensesMonth: function () {
      for (const key in this.expenses) {
        this.expensesMonth += +this.expenses[key]; 
      }
    },
    // бюджет месяц/день (доходы - расходы)  
    getBudget: function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    // подсчет срока достижения цели
    getTargetMonth: function () {

      return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    // определение уровня доходов
    getStatusIncome: function () {
      switch (true) {
        case (this.budgetDay >= 1200):
          return 'У вас высокий уровень дохода';
          //break;
        case (this.budgetDay >= 600):
          return 'У вас средний уровень дохода';
          //break;
        case (this.budgetDay >= 0):
          return 'К сожалению у вас уровень дохода ниже среднего';
          //break;
        default:
          return 'Что то пошло не так';
      }
    },
    
    // информация по депозиту
    getInfoDeposit: function() {
      if (this.deposit) {
        do {
          this.percentDeposit = prompt('Какой годовой процент депозита:?', 10);
        } while (!isNumber(this.percentDeposit));
        do {
          this.moneyDeposit = prompt('Какая сумма у Вас на депозите?: ', 10000);
        } while (!isNumber(this.moneyDeposit));
      }
    },

    // индикатор Период расчета
    showPeriodValue: function() {
      periodAmount.textContent = periodSelect.value;
    },
    
    // доход за период
    calcPeriodSavedMoney: function() {
      if (this.budget !== 0){
        return (incomePeriodValue.value = this.budgetMonth * periodSelect.value);
      }
    }

  };   // end of appData{}

  
  //appDataClone = JSON.parse(JSON.stringify(appData));
  

btnStart.addEventListener('click', appData.start.bind(appData));

btnCancel.addEventListener('click', appData.reset.bind(appData));

btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);

btnPlusIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.showPeriodValue);

periodSelect.addEventListener('input', appData.calcPeriodSavedMoney.bind(appData));

// разрешен ввод только цифр
inputPlaceholderSum.forEach(function(item) {
  item.addEventListener('keyup', function(event){
    this.value = this.value.replace(/[^\d]/g, '');
    //event.preventDefault();
    });
  });

// разрешен ввод кириллицы, пробелов, знаков припинания
inputPlaceholderName.forEach(function(item) {
  item.addEventListener('keyup', function(){
    this.value = this.value.replace(/[^[А-Яа-яЁё\s\,\.\:\-\;]+$/g, ''); 
  });
});


