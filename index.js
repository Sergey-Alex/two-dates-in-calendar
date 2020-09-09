let calendar  = document.querySelector('#calendar');
let body = calendar.querySelector('.body');
let p = document.getElementById('p');
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let info = document.querySelector('.info');
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');

function range(count) {
    let arr = [];
    for (let i = 1; i <= count; i++){
        arr.push(i);

    }
    return arr;
}

function getLastDay(year, month) {
    let date = new Date(year, month + 1, 0);
    let lastDay = date.getDate();
    return lastDay;
}

function getFirstWeekDay(year, month) {
    let date = new Date(year, month, 1);
    let firstWeekDay = date.getDay();
    if (firstWeekDay == 0){
        return 6;
    } else {
        return firstWeekDay - 1;
    }
    return  firstWeekDay;
}


function getLastWeekDay(year, month) {
    let date = new Date(year, month + 1, 0);
    let lastWeekDay = date.getDay();
    if (lastWeekDay == 0){
        return 6;
    } else {
        return lastWeekDay - 1;
    }
    return  lastWeekDay;
}


function normalize(arr, left, right) {
    for (let i = 0; i < left; i++){
        arr.unshift('');
    }
    for (let j = 0; j < right; j++){
        arr.push('');
    }
    return arr;
}

function chunk(arr, n) {
     let result = [];
     let count = Math.ceil(arr.length/n);
     for (let i = 0; i < count; i++){
         let elems  = arr.splice(0,n);
         result.push(elems);
     }
     return result;
}

function createTable(parent, arr)  {
    parent.innerHTML = '';
    for (let elem of arr){
        let tr = document.createElement('tr');
    for (let  inElem of elem){
        let td = document.createElement('td');
        td.innerHTML = inElem;
        td.dataset.num = inElem;
        tr.appendChild(td);
        td.addEventListener('click', function () {
            td.classList.toggle('red');
            let tds = document.querySelectorAll('.red');
            for (let i = 0; i < tds.length; i++){
                if (tds.length == 2){
                   p.innerHTML = Math.abs(tds[0].getAttribute('data-num') - tds[1].getAttribute('data-num'));
                }

            }
        })
    }
    parent.appendChild(tr);
    }
}

function draw(body, year, month) {
    let arr = range(getLastDay(year, month));
    let lastWeekDay = getLastWeekDay(year,month);
    let firstWeekDay = getFirstWeekDay(year, month);
    let res  = chunk(normalize(arr, firstWeekDay, 6 -lastWeekDay),7);
    createTable(body, res);
}

draw(body,year,month)

let countMonth = 0;
let months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
info.innerHTML = months[month] + ' ' + year;
next.addEventListener('click', function () {
    draw(body, getNextYear(year, month), getNextMonth(month));
    let num = new Date(year, month + countMonth);
    info.innerHTML = months[num.getMonth()] + ' ' + num.getFullYear();
})

prev.addEventListener('click', function() {
    draw(body, getPrevYear(year, month), getPrevMonth(month));
    let num = new Date(year, month + countMonth);
    info.innerHTML = months[num.getMonth()] + ' ' + num.getFullYear();
});

function getNextYear(year, month){
    return new Date(year, month + countMonth + 1).getFullYear();
}

function getNextMonth(month) {
    countMonth++;
    return month + countMonth;
}

function getPrevYear(year, month) {
    return new Date(year, month  + countMonth - 1).getFullYear();
}
function getPrevMonth(month) {
    countMonth--;
    return month - countMonth;
}