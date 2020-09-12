//Назначение обработчиков для главного меню
$('[data-id="menu-hamburger"]').click(function () {
    $('.order-food').empty();
    $('#menu .active').removeClass('active');
    $('[data-id="menu-hamburger"]').parent().addClass('active');
    shops[0].outputData();
});
$('[data-id="menu-filling"]').click(function () {
    $('.order-food').empty();
    $('#menu .active').removeClass('active');
    $('[data-id="menu-filling"]').parent().addClass('active');
    shops[1].outputData();
});
$('[data-id="menu-additionally"]').click(function () {
    $('.order-food').empty();
    $('#menu .active').removeClass('active');
    $('[data-id="menu-additionally"]').parent().addClass('active');
    shops[2].outputData();
});
$('[data-id="menu-drink"]').click(function () {
    $('.order-food').empty();
    $('#menu .active').removeClass('active');
    $('[data-id="menu-drink"]').parent().addClass('active');
    shops[3].outputData();
});
$('#order-food').on('click', function (event) {
    var orderPosition;
    var errorIndex=1; //Выход из цикла поиска родителя при отсутствии последнего
    var myEvent=event.target; //сохранение места клика в переменную
    for(var i=0;i<shopFood.length;i++){
        //Поиск родителя с требуемым классом
        while (errorIndex<10){
            if(myEvent.className=='food-position')break;
            myEvent=myEvent.parentNode;
            errorIndex++;
        }
        if(shopFood[i].getIdFood()==myEvent.dataset.id) {
            var flagOrder=true; //Наличие в позиции товара
            //Уменьшение количества на единицу
            flagOrder=shopFood[i].reductionGoods(1);
            //Обновление информации на кнопках
            myEvent.children[3].innerText = '(Осталось товара: ' + shopFood[i].getFoodNumber() + ')';

            //Изминение цвета наведения при отсутствии товара

            if (shopFood[i].getFoodNumber() <= 0) {

                myEvent.onmouseover = function () {
                    this.style.boxShadow = '0 0 15px #ff00bf';
                }
            }
            else {

                myEvent.onmouseout=function () {
                    this.style.boxShadow ='';
                }
            }
            //Запоминание заказа
            if(flagOrder) {
                orderPosition = [shopFood[i].getIdFood(), 1];
                setOrder(orderPosition);
                getOrderInfo();
            }

            break;

        }
    }
});

