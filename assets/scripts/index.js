//Элементы формы
const form = document.forms.form;
const carModelSelect = document.getElementById('carModel');
const carTypeSelect = document.getElementById('carType');
const inputs = document.querySelectorAll('input');
const totalPriceElement = document.getElementById('totalPrice');

//радиокнопки
const radioEquipment = document.querySelectorAll('input[name="equipment"]');
const radioEngine = document.querySelectorAll('input[name="engine"]');
const radioColor = document.querySelectorAll('input[name="color"]');

//чекбоксы
const ceramic = document.querySelector('input[name="ceramic"]');
const motoristSet = document.querySelector('input[name="motoristSet"]');
const parkingSystem = document.querySelector('input[name="parkingSystem"]');

//базовые цены
const basePriseGranta = 724900;
const basePriseVesta = 1121900;
const basePriseLargus = 1300900;

// Создаём массив типов кузова
const carTypes = {
    Granta: ["Sedan", "Liftback", "Hatchback", "Universal"],
    Vesta: ["Sedan", "Universal"],
    Largus: ["Universal"]
};

//Обработчик события изменения значения выпадающего списка с моделями
carModelSelect.addEventListener('change', () => {
    selectedCarModel = carModelSelect.value;

    if (selectedCarModel != "") {
        carTypeSelect.disabled = false;
    } else {
        carTypeSelect.disabled = true;
        form.reset();
        totalPriceElement.innerText = 0;
    }

    //Очистка выпадающего списка
    carTypeSelect.innerHTML = '<option value="">Выберите тип кузова</option>';

    //Получение типов кузова на основе выбранной модели автомобиля
    const types = carTypes[selectedCarModel] || [];

    //Добавление опций во второй выпадающий список на основе определенных моделей
    types.forEach((carType) => {
        const optionType = document.createElement("option");
        optionType.value = carType;
        optionType.text = carType;
        carTypeSelect.add(optionType);
    });
});

//Обработчик события изменения значения выпадающего списка с типами кузова
carTypeSelect.addEventListener('change', () => {
    selectedCarType = carTypeSelect.value;
    calculate();
});

function calculate() {
    //цена в зависимости от выбранной модели и типа кузова
    if ((selectedCarModel === 'Granta') && (selectedCarType === 'Sedan')) {
        totalPrice = basePriseGranta;
    } else if ((selectedCarModel === 'Granta') && (selectedCarType === 'Liftback')) {
        totalPrice = basePriseGranta * 1.03;
    } else if ((selectedCarModel === 'Granta') && (selectedCarType === 'Hatchback')) {
        totalPrice = basePriseGranta * 1.07;
    } else if ((selectedCarModel === 'Granta') && (selectedCarType === 'Universal')) {
        totalPrice = basePriseGranta * 1.08;
    } else if ((selectedCarModel === 'Vesta') && (selectedCarType === 'Sedan')) {
        totalPrice = basePriseVesta;
    } else if ((selectedCarModel === 'Vesta') && (selectedCarType === 'Universal')) {
        totalPrice = basePriseVesta * 1.08;
    } else if ((selectedCarModel === 'Largus') && (selectedCarType === 'Universal')) {
        totalPrice = basePriseLargus;
    } else {
        form.reset();
        totalPrice = 0;
        carTypeSelect.disabled = true;
    }

    //вычисление стоимости авто в соответствии с выбраной комплектацией 
    for (radio of radioEquipment) {
        if (radio.checked) {
            totalPrice = totalPrice * +(radio.value);
        }
    }

    //вычисление стоимости авто в соответствии с выбранным типом двигателя
    for (radio of radioEngine) {
        if (radio.checked) {
            totalPrice = totalPrice * +(radio.value);
        }
    }

    //вычисление стоимости авто в соответствии с выбранным цветом
    for (radio of radioColor) {
        if (radio.checked) {
            totalPrice = totalPrice + +(radio.value);
        }
    }

    //вычисление стоимости авто в зависимости от выбранных аксессуаров
    if (ceramic.checked) {
        totalPrice = totalPrice + +(ceramic.value);
    }

    if (motoristSet.checked) {
        totalPrice = totalPrice + +(motoristSet.value);
    }

    if (parkingSystem.checked) {
        totalPrice = totalPrice + +(parkingSystem.value);
    }

    totalPriceElement.innerText = totalPrice;

    formatSum();
}

for (const input of inputs) {
    input.addEventListener('input', function () {
        calculate();
    })
}

//форматирование суммы
function formatSum() {
    const formatter = new Intl.NumberFormat('ru', {
        maximumFractionDigits: 2
    });
    totalPriceElement.innerText = formatter.format(totalPrice);
}