if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
    
    
} else {
    ready()   
}


/*DROP DOWN MENU*/


document.addEventListener("click", e =>{
    const isDropDownButton = e.target.matches("[data-dropdown-button]")
    if(!isDropDownButton && e.target.closest('[data-dropdown]') !=null)return
    let currentDropdown
    if(isDropDownButton){
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }
})



function ready(){


    if (localStorage.getItem('red')!=null){
        var cartItems = document.getElementsByClassName('cart__menu1')[0].innerHTML = localStorage.getItem('red');
        }
        else {
            var cartItems = document.getElementsByClassName('cart__menu1')[0];
        }

/*REMOVE*/

    var remove = document.getElementsByClassName('cart__menu__item__remove2')
    for (var i = 0; i < remove.length; i++){
    var button = remove[i];
    button.addEventListener('click', removeCartItem)
    }

/*BUY*/    

    document.getElementsByClassName('purchase')[0].addEventListener('click',buy)
   


/*QUANTITY*/

    var quantityInputs = document.getElementsByClassName('cart__menu__item__add')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }

/*ADD*/

    var addToCartButtons = document.getElementsByClassName('item__button')
    for (var i = 0; i < addToCartButtons.length; i++){
    var button1 = addToCartButtons[i]
    button1.addEventListener('click',addToCartClicked)
    } 
    update();
    
}


/*QUANTITY*/


function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    update()
}


/*REMOVE ITEM*/


function removeCartItem(event){
    var Clicked = event.target;
    Clicked.parentElement.parentElement.remove();
    
    update(); 
    var cartItems = document.getElementsByClassName('cart__menu1')[0]
    localStorage.setItem('red',cartItems.innerHTML)
}

/*BUY*/

function buy(){
   
    alert('Thank you')
    var cartItems = document.getElementsByClassName('cart__menu1')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    localStorage.clear()
    update()
    
}




/*TOTAL*/


var j = 0;
function update(){
    var cartItemContainer = document.getElementsByClassName('cart__menu')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart__menu__item');
    var total = 0;
    var total2 = 0;
   
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart__menu__item__price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart__menu__item__add')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity) 
    }
    if(total<100){
        j=0;
       }
    else if(total>=100 && j==0 ){
        j++;
        alert('Discound 10%')
   }
    if(total>=100 ){
        total = total - total*0.1; 
        total = Math.round(total*100)/100 
        total2 = total *0.1; 
        total2 = Math.round(total2*100)/100
        document.getElementsByClassName('cart__menu__total2')[0].innerText = total + " (-$" + total2 + ")" ;
    }
    else{
        total = Math.round(total*100)/100
        document.getElementsByClassName('cart__menu__total2')[0].innerText = total  ;
    }
    total = Math.round(total*100)/100   
}



/*ADD*/ 


function addToCartClicked(event){
    var button1 = event.target
    var itemBox = button1.parentElement.parentElement
    var title = itemBox.getElementsByClassName('item__description')[0].innerText
    var price = itemBox.getElementsByClassName('item__price')[0].innerText
    var image = itemBox.getElementsByClassName('item__img')[0].src
    addItemToTheCart(title,price,image)
    update()
}

function addItemToTheCart(title,price,image){

    
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart__menu__item')
    var cartItems = document.getElementsByClassName('cart__menu1')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart__menu__item__description')
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert("It's already added")
            return
        }
    }
    var cartRowConternts = `
    <div class="cart__menu__item__img"><img src="${image}" width="80" height="80"></div>
    <div class="cart__menu__item__description">${title}</div>
    <div class="cart__menu__item__price"> ${price}</div>                             
    <input  class="cart__menu__item__add" type="number" value="1">  
    <div class="cart__menu__item__remove">
        <button class="cart__menu__item__remove2">Remove</button>
    </div>
    `
    cartRow.innerHTML= cartRowConternts
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cart__menu__item__remove2')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart__menu__item__add')[0].addEventListener('change',quantityChanged)  

    localStorage.setItem('red',cartItems.innerHTML)

}


