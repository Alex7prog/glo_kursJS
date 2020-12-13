/******************************************
                Lesson 15 part 1
*******************************************/
// используем строгий режим
'use strict';

const btnStart = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    btnPlusExpenses = btnPlus[1],
    btnPlusIncome = btnPlus[0],
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    //checkDeposit = document.querySelector('.deposit-checkmark'),
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
    addExpenses = document.getElementsByClassName('additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    //inputCheck = document.querySelector('[type="checkbox"]'),
    inputPeriod = document.querySelector('[type="range"]'),
    inputPlaceholderName = document.querySelectorAll('[placeholder="Наименование"],[placeholder="название"]'),
    inputPlaceholderSum = document.querySelectorAll('[placeholder="Сумма"], [placeholder="Процент"]'),
    depositCheck = document.getElementById('deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

// изменяемые селекторы
let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

// Класс
class AppData {
    constructor() {
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
    }
    // расчеты и вывод результатов в форму по кнопке Рассчитать
    start() {

        if ((salaryAmount.value === '') && !isNumber(salaryAmount.value)) {
            alert('Укажите Месячный доход!');
            return;
        }
        if (this.deposit) {
            if (depositAmount.value === '') {
                alert('Укажите сумму депозита!');
                return;
            }
            if (depositPercent.value === '') {
                alert('Не указан процент депозита!');
                return;
            }
        }

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();

        this.getBudget();

        this.showResult();

        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
        //блок input левой части формы
        document.querySelectorAll('input').forEach( (item) => {
        item.disabled = true;
        });
    }

    //вывод результатов в форму
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriodSavedMoney();
    }

    // исходное состояние программы
    reset() {
    // обнуляем свойства объекта
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

        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');

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
        
        //обнуляем значения депозита
        depositCheck.checked = false;
        this.deposit = false;

        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';

        depositBank.value = '';
        depositAmount.value = '';
        depositPercent.value = '';

        btnStart.style.display = 'block';
        btnCancel.style.display = 'none';
        //разблокируем input левой части формы
        document.querySelectorAll('input').forEach( (item) => {
            item.disabled = false;
        });
    } // END of reset: function()

    // обязательные расходы - добавление новых
    addExpensesBlock() {
        // проверка на пустые поля данных
        let inputEmpty = false;

        expensesItems.forEach( (item) => {
            if ((item.querySelector('.expenses-title').value === '') || 
                (item.querySelector('.expenses-amount').value === '')) {
                    inputEmpty = true;
                }
        });
        if (!inputEmpty) {
            const cloneExpensesItem = expensesItems[0].cloneNode(true);
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
                querySelector('[placeholder="Сумма"]').addEventListener('keyup', function() {
                this.value = this.value.replace(/[^\d]/g, '');
            });
            expensesItems[expensesItems.length-1].
                querySelector('[placeholder="Наименование"]').addEventListener('keyup', function() {
                    this.value = this.value.replace(/[^[А-Яа-яЁё\s\,\.\:\-\;]+$/g, '');
                });

        } else {
            alert('Есть не заполненные поля. Введите данные');
        }
    }

    // обязательные расходы
    getExpenses() {
        // 1й вариант) стрелочная функция, что бы использовать this
        expensesItems.forEach( (item) => {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if ((itemExpenses !== '') && (cashExpenses !== '')) {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    // дополнительный доход - добавление нового
    addIncomeBlock() {
    // проверка на пустые поля данных
        let inputEmpty = false;
        incomeItems.forEach( (item) => {
            if ((item.querySelector('.income-title').value === '') || 
                (item.querySelector('.income-amount').value === '')) {
                inputEmpty = true;
            }
        });

    if (!inputEmpty) {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        // очищаем значения нового элемента полученных при клонировании
        cloneIncomeItem.querySelector('.income-title').value = '',
        cloneIncomeItem.querySelector('.income-amount').value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');

        if  (incomeItems.length === 3) {
        btnPlusIncome.style.display = "none";
        }
        
        // валидация данных
        incomeItems[incomeItems.length-1].
        querySelector('[placeholder="Сумма"]').addEventListener('keyup', function() {
        this.value = this.value.replace(/[^\d]/g, '');
        });
        incomeItems[incomeItems.length-1].
        querySelector('[placeholder="Наименование"]').addEventListener('keyup', function() {
        this.value = this.value.replace(/[^[А-Яа-яЁё\s\,\.\:\-\;]+$/g, '');
        });

    } else {
        alert('Есть не заполненные поля. Введите данные');
    }
    } // END addIncomeBlock = function()

    // дополнительный доход
    getIncome() {
        // 2й вариант) передаем аргумент, что бы использовать this
        incomeItems.forEach( (item) => {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if ((itemIncome !== '') && (cashIncome !== '')) {
                this.income[itemIncome] = cashIncome;
            }
        // !!!
        }, this);

        for (const key in this.income) {
        this.incomeMonth += +this.income[key];
        }
    }

    // возможные расходы
    getAddExpenses() {
        const addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach( (item) => {
            if (item !== '') {
            this.addExpenses.push(item.trim());
            }
        });
    }

    // возможный доход
    getAddIncome() {
        addIncomeItem.forEach( (item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
            this.addIncome.push(itemValue);
            }
        });
    }

    //подсчет обязательных месячных расходов
    getExpensesMonth() {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key]; 
        }
    }

    // бюджет месяц/день (доходы - расходы)  
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    // подсчет срока достижения цели
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    // определение уровня доходов
    getStatusIncome() {
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
    }

    // индикатор Период расчета
    showPeriodValue() {
        periodAmount.textContent = periodSelect.value;
    }

    // доход за период
    calcPeriodSavedMoney() {
        if (this.budget !== 0){
            return (incomePeriodValue.value = this.budgetMonth * periodSelect.value);
        }
    }

    // информация по депозиту
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    
    // проверка значения процентов депозита
    percentValueCheck() {
        if (depositPercent.value > 100) {
            alert('Введите корректное значение процентов по депозиту ( 0 .. 100)');
            depositPercent.value = '';
        }
    }
    
    // выбор процентов депозита
    changePercent() {
        const valueSelect = this.value;

        if (valueSelect === 'other') {
            // домашнее задание
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';

        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }

    // опции депозита
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            
            this.deposit = true;
            
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';

            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;

            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    addAppDataEventListeners() {
        btnStart.addEventListener('click', this.start.bind(this));
        btnCancel.addEventListener('click', this.reset.bind(this));
        btnPlusExpenses.addEventListener('click', this.addExpensesBlock);
        btnPlusIncome.addEventListener('click', this.addIncomeBlock);
        
        periodSelect.addEventListener('input', this.showPeriodValue);
        periodSelect.addEventListener('input', this.calcPeriodSavedMoney.bind(this));
        
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('input',this.percentValueCheck.bind(this));

        // разрешен ввод только цифр
        inputPlaceholderSum.forEach( (item) => {
        item.addEventListener('keyup', function() {
            this.value = this.value.replace(/[^\d]/g, '');
            });
        });
        // разрешен ввод кириллицы, пробелов, знаков припинания
        inputPlaceholderName.forEach( (item) => {
        item.addEventListener('keyup', function() {
            this.value = this.value.replace(/[^[А-Яа-яЁё\s\,\.\:\-\;]+$/g, ''); 
        });
        });
    }

} // END class AppData {}


// объект на основе класса
const appData = new AppData();
// обработчик всех событий
appData.addAppDataEventListeners();




