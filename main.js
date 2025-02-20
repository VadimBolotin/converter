// fetch('https://www.cbr-xml-daily.ru/daily_json.js')
//     .then(function(result) {
//         return result.json()
//     }).then(function(data) {
//         console.log(data)
//     })

// Обьект с курсами 3-х валют
const rates = {};

// Элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// Элементы формы, ввод суммы, выбор валют, поле с рузультатом
const input = document.querySelector('#input');
const select = document.querySelector('#select');
const result = document.querySelector('#result');

getCurrencies();

// Обновление каждые 10 секунд
setInterval(getCurrencies, 10000)

// Функция получения курса валют и отображение их на странице
async function getCurrencies () {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    //Цвет для информера USD
    if(rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else if (rates.USD.Value < rates.USD.Previous) {
        elementUSD.classList.add('bottom');
    }else {
        elementUSD.classList.remove('top');
        elementUSD.classList.remove('bottom');
        
    }

    //Цвет для информера EUR
    if(rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else if (rates.EUR.Value < rates.EUR.Previous) {
        elementEUR.classList.add('bottom');
    } else {
        elementEUR.classList.remove('top');
        elementEUR.classList.remove('bottom');
    }

    //Цвет для информера GBP
    if(rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    } else if (rates.GBP.Value < rates.GBP.Previous) {
        elementGBP.classList.add('bottom');
    } else {
        elementGBP.classList.remove('top');
        elementGBP.classList.remove('bottom');
    }

    console.log('Обновление')
}

// Слушаем изменения в текстовом поле и в select
input.oninput = covertValue;
select.oninput = covertValue;

// Функция ковертации
function covertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}
