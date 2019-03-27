let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    income = document.querySelector('#income'),
    savings = document.querySelector('#savings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue =  document.querySelector('.day-value');

let money, time, flag = false;

startBtn.addEventListener('click', function(){
    flag = true;

    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');

    while(isNaN(money) || money == '' || money == null){
        money = +prompt('Ваш бюджет на месяц?', '');
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});


expensesItemBtn.addEventListener('click', function() {
    if (flag) {
        let sum = 0;
        for(let i = 0; i < expensesItem.length; i++){
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;

            if((typeof(a)) != null && (typeof(b)) != null && (a != '') && (b != '') && a.length < 50){
                appData.expenses[a] = b;
                sum += +b;
            } else{
                i = i -1;
            }
        }
        expensesValue.textContent = sum;
    }
});

optionalExpensesBtn.addEventListener('click', function() {
    if (flag) {
        for( let i = 0; i < optionalExpensesItem.length; i++){
            let opt = optionalExpensesItem[i].value;

            if((typeof(opt) === 'string') && (typeof(opt) != null) && (opt != '') && opt.length < 50){
                appData.optionalExpenses[i] = opt;
            } else{
                i--;
            }
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ', ';
        }
    }
});

countBudgetBtn.addEventListener('click', function() {     //ВОТ ЭТОТ КОД
    if (flag) {

        if(appData.budget != undefined) {

            let sum = 0;
            for (var key in appData.expenses) {
                sum += appData.expenses[key];
            }

            appData.moneyPerDay = ((appData.budget-sum)/ 30).toFixed();
            dayBudgetValue.textContent = appData.moneyPerDay;

            if( appData.moneyPerDay < 100){
                levelValue.textContent = "Минимальный уровень заработка!";
            } else if( appData.moneyPerDay > 100 && appData.moneyPerDay < 1000){
                levelValue.textContent = "Средний уровень заработка!";
            } else if( appData.moneyPerDay > 1000){
                levelValue.textContent = "Высокий уровень заработка!";
            } else{
                levelValue.textContent = "Error!";
            }
        } else {
            dayBudgetValue.textContent = "Произошла ошибка!";
        }
    }
});

income.addEventListener('input', function() {
    let items = income.value;
    appData.income = items.split(',');
    incomeValue.textContent = appData.income;

});

savings.addEventListener('click', function() {
   if( appData.savings == true){
       appData.savings = false;
   } else {
       appData.savings = true;
   }
});

sumValue.addEventListener('input', function() {
   if(appData.savings == true){
       let sum = +sumValue.value,
           percent = +percentValue.value;

       appData.monthIncome = sum/100/12*percent;
       appData.yearIncome = sum/100*percent;

       monthSavingsValue.textContent = appData.monthIncome;
       yearSavingsValue.textContent = appData.yearIncome;
   }
});

percentValue.addEventListener('input', function() {
    if(appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};