//Массив будет содержать данные для заказа
var order=[];
var timerOrder=0;
var allSumPrice=0; //Общая сумма заказа
var allSumCalories=0; //Общее количество калориев
//Добавление позиции к заказу
function setOrder(orderData) {
    if (order.length!=0){
        var flag=false;
        for(var j=0;j<order.length;j++){
            if(order[j][0]===orderData[0]){
                order[j][1]+=orderData[1];
                flag=true;
            }
        }
        //Запись позиции в массив заказа
        if(flag===false){
            order.push(orderData);
        }
    }
    else order.push(orderData);
}
//Вывод заказанного товара на экран
function getOrderInfo() {

    var infoBar=document.getElementById('basket-list');
    var str='<br>';
    for(var i=0;i<order.length;i++){
        for(var j=0;j<shopFood.length;j++){
            if (order[i][0]==shopFood[j].foodId){
                str+='<p>Товар: "'+shopFood[j].foodName+'".  Калории: '+
                    (shopFood[j].calories*order[i][1])+'.  Количество: '+
                    order[i][1]+'.  Цена: '+(shopFood[j].price*order[i][1])+'.</p>';
                allSumCalories+=parseInt(shopFood[j].calories*order[i][1]);
                allSumPrice+=parseInt(shopFood[j].price*order[i][1]);
                timerOrder+=parseInt(shopFood[j].time);
                break;
            }
        }
    }
    str+='<br><p class="orderSum">Сумма заказа: '+allSumPrice+'.  Всего калорий: '+allSumCalories+'.</p>'
    str+='<br><button type="button" data-time="'+timerOrder+'" id="order-button" class="btn btn-success order-button">Оформить заказ</button>';
    infoBar.innerHTML=str;

    //Обработчик для кнопки
    document.getElementById('order-button').addEventListener('click',function () {
        var timeSec=this.dataset.time;
        var timeMin=Math.floor(timeSec/60);
        alert('Вам нужно подождать: '+timeMin+' мин. и '+(timeSec-(timeMin*60))+' сек.');

    })
}


var Food=function (foodId, category, foodName, foodImg, calories, price, foodNumber, time) {
    this.foodId=foodId;
    this.category=category;
    this.foodName=foodName;
    this.foodImg=foodImg;
    this.calories=calories;
    this.price=price;
    this.foodNumber=foodNumber;
    this.time=time;
};
//Получение кол-ва товара
Food.prototype.getFoodNumber=function () {
    return this.foodNumber;
}
//Получение категории
Food.prototype.getCategory=function () {
    return this.calories;
};
//Получение ID товара
Food.prototype.getIdFood=function () {
    return this.foodId;
};
//Проверка на наличие товара
Food.prototype.validCheck=function (number) {
    if(number>this.foodNumber){
        return [false,number-this.foodNumber];
    }
    return [true,number];
};
//Списание товара
Food.prototype.reductionGoods=function (number) {
    number=number||1;  //Заглушка на ввод количества товара
    var validMas=this.validCheck(number);
    if (validMas[0]==true){
        this.foodNumber-=number;
        return true;
    }
    else {
        alert('Извините!!! Заказываемый товар отсутствует.');
        return false;
    }
};


//Массив содержит весь асортимент товара
var shopFood=[
    new Food('001','hamburger','Малый гамбургер','img/small.jpg',20,50,6,300),
    new Food('002','hamburger','Средний гамбургер','img/middle.jpg',30,75,2,350),
    new Food('003','hamburger','Большой гамбургер','img/big.jpg',40,100,7,400),
    new Food('004','filling','Сыр','img/cheese.jpg',20,10,25,10),
    new Food('005','filling','Листья салата','img/salad.jpg',5,20,35,20),
    new Food('006','filling','Картофель','img/potato.jpg',10,15,39,25),
    new Food('007','filling','Грибы','img/boletus.jpg',15,10,9,12),
    new Food('008','additionally','Приправа','img/condiment.jpg',0,15,19,10),
    new Food('009','additionally','Майонез','img/mayo.jpg',5,20,23,10),
    new Food('010','additionally','Кетчуп','img/catsup.jpg',5,20,13,10),
    new Food('011','drinks','Чай','img/tea.jpg',7,15,50,60),
    new Food('012','drinks','Кофе','img/coffee.jpg',5,15,50,60)
];

//Класс формирует таблицу выбора товара по категориям
var Products=function (myClass, positionFood) {
    this.myClass=myClass;
    this.positionFood=positionFood;
};

//Редактирование данных
Products.prototype.editData=function (paramID) {

}


//Метод формирует меню
Products.prototype.outputData=function () {
    var IMG_FOOD='80px';  // Размер блока с изображением
    var NAME_FOOD_MARGINE='0 10px 0 10px'; //Задание отступа для текста
    var NAME_FOOD_LINEHIGHT='80px'; //Выравнивание по вериткали
    var NAME_FOOD_SIZE='26px';
    var NAME_FOOD_FONT_STYLE='Kurale';
    var FOOD_NUMBER_SIZE='14px';

    var myData=this.myClass.split('-');
    var orderFood=document.getElementsByClassName('order-food');
    for(var i=0;i<this.positionFood.length;i++){
        if(this.positionFood[i] instanceof Food){
            if (myData[1]===this.positionFood[i].category){
                var blokA=document.createElement('a');
                    blokA.href='#';
                    blokA.classList.add('food-position');
                    blokA.style.display='block';
                    blokA.style.height='100px';
                    blokA.style.width='85%';
                    blokA.style.border='1px solid gray';
                    blokA.style.borderRadius='10px';
                    if(this.positionFood[i].foodNumber<=0){
                        blokA.onmouseover=function (ev) {
                            this.style.boxShadow='0 0 15px #ff00bf';
                        };
                    }
                    else blokA.onmouseover=function (ev) {
                        this.style.boxShadow='0 0 15px green';
                    };
                    blokA.onmouseout=function () {
                        this.style.boxShadow='';
                    };
                    blokA.style.margin='20px auto 0';
                    blokA.style.padding='10px';
                    blokA.dataset.id=this.positionFood[i].foodId;
                    //var foodId=this.positionFood[i].foodId;


                    var imgBlok=document.createElement('img');
                    imgBlok.style.width=IMG_FOOD;
                    imgBlok.style.height=IMG_FOOD;
                    imgBlok.style.cssFloat='left';
                    imgBlok.src=this.positionFood[i].foodImg;
                    blokA.appendChild(imgBlok);

                    var pNameBlok=document.createElement('p');
                    pNameBlok.style.cssFloat='left';
                    pNameBlok.style.margin=NAME_FOOD_MARGINE;
                    pNameBlok.style.textTransform='uppercase';
                    pNameBlok.style.lineHeight=NAME_FOOD_LINEHIGHT;
                    pNameBlok.style.fontSize=NAME_FOOD_SIZE;
                    pNameBlok.style.fontFamily=NAME_FOOD_FONT_STYLE;
                    pNameBlok.style.fontStyle='italic';
                    pNameBlok.innerText=this.positionFood[i].foodName;
                    blokA.appendChild(pNameBlok);

                    var pFoodPrice=document.createElement('p');
                    pFoodPrice.style.cssFloat='left';
                    pFoodPrice.style.lineHeight=NAME_FOOD_LINEHIGHT;
                    pFoodPrice.style.color='green';
                    pFoodPrice.style.fontStyle='italic';
                    pFoodPrice.style.fontSize='18px';
                    pFoodPrice.style.margin=NAME_FOOD_MARGINE;
                    pFoodPrice.innerText='Цена: '+this.positionFood[i].price+'р.';
                    blokA.appendChild(pFoodPrice);

                    var pFoodNumber=document.createElement('p');
                    pFoodNumber.style.cssFloat='right';
                    pFoodNumber.style.lineHeight=NAME_FOOD_LINEHIGHT;
                    pFoodNumber.style.fontSize=FOOD_NUMBER_SIZE;
                    pFoodNumber.style.margin=NAME_FOOD_MARGINE;
                    pFoodNumber.innerText='(Осталось товара: '+this.positionFood[i].foodNumber+')';
                    blokA.appendChild(pFoodNumber);


                orderFood[0].appendChild(blokA);
            }
        }
    }

}

var shops=[
    new Products('menu-hamburger',shopFood),
    new Products('menu-filling',shopFood),
    new Products('menu-additionally',shopFood),
    new Products('menu-drinks',shopFood)
    ];