document.getElementById("icon_menu").addEventListener("click", mostrar_menu);
function mostrar_menu(){

    document.querySelector(".menu").classList.toggle("mostrar_menu");

}
//Mostrar el carro de compras
function mostrar_menu(){

    document.querySelector(".menu").classList.toggle("mostrar_menu");
}
// Estructura del carro de compras
let cartToggle = document.getElementById('cart-button');
let cartToggleCount = 0;
let cartWrapper = document.getElementById('cart-wrapper');
let cartElement = document.getElementById('cart');
let subtotal = document.getElementById('subtotal');
let total = document.getElementById('total');

let addToCartButton = document.querySelectorAll('.add-to-cart');

let cartProductQuantity = "<input name='quantity' id='quantity-value' type='number' value='1' onclick='updateQuantity(this)'>";

let productRemove = "<button class='remove' onclick='removeFromCart(this)'>X</button>";

let updatedPrice;
let added = [], itemClass = {};

 // Capturar el cuerpo del carro de compras que está en HTML
var cartTableBody = document.getElementById('cart-table-body');

// Cart object model
let cart = {
    'items': [],
    "subtotal": 0,
    'total': 0
};

for (let button of addToCartButton) {
    button.addEventListener('click', addToCart);
}


$('.trigger, .keep-shopping').click(function() {
  $('.slider').toggleClass('close');
});

// Añadir artículos al carro de compras
function addToCart(event) {
    
    let getInput = document.getElementById('quantity-value');
    
    if (added.includes(event.target.parentElement.id)) {
        duplicateId = '#' + event.target.parentElement.id;
        cartTableBody.querySelector(duplicateId).querySelector('#quantity-value').value++;
        getInput.click();
        return;
    }
    
    // Capture product
    let product = event.target.parentNode;
    let productId = product.id;
    added.push(productId);
    let productName = product.querySelector('.product-name').innerHTML;
    let productPrice = product.querySelector('.product-price').innerHTML.replace(/[^\d.-]/g, '');
    productPrice = Number(productPrice);
    let productUpdatedPrice = productPrice;
    
    thisClass = product.classList.value.split(' ');
    itemClass[productId] = thisClass;
    
    // Añadir artículo al carro de compras usando el modelo de JavaScript
    cart.items.unshift({
		'product': productId,
		'productName': productName,
		'productPrice': productPrice,
		'productUpdatedPrice': productUpdatedPrice,
	});
    
    
    // Añadir una nueva fila por cada producto
    let productRow = document.createElement('tr');
    productRow.setAttribute('id', productId);
    cartTableBody.appendChild(productRow);
    
    // Añadir 5 columnas por cada fila de cada producto
    for (let num = 0; num <= 6; num++) {
        let newColumn = document.createElement('td');
        productRow.appendChild(newColumn);
    }
            
    // Construir el carro de compras HTML
    productRow.childNodes[0].innerHTML = productName;
    productRow.childNodes[1].innerHTML = cartProductQuantity;
    productRow.childNodes[1].setAttribute('id', 'quantity');
    productRow.childNodes[2].innerHTML = productPrice;
    productRow.childNodes[2].setAttribute('id', 'product-price');
    productRow.childNodes[2].setAttribute('class', 'cart-product-price');
    productRow.childNodes[3].innerHTML = productPrice;
    productRow.childNodes[3].setAttribute('id', 'updated-product-price');
    productRow.childNodes[3].setAttribute('class', 'cart-updated-product-price');
    productRow.childNodes[4].innerHTML = productRemove;
    
    
    
    updateSubtotal();
    updateTotal();
    
    $('.slider').toggleClass('close');
    
}

//Eliminar artículo(s) del carro de compras
function removeFromCart(event) {
    let parentRow = event.parentNode.parentNode;
    let parentBody = parentRow.parentNode;
    let parentRowId = parentRow.id;
    parentBody.removeChild(parentRow);
    
    total.value = (Number(total.value) - parentRow.querySelector('#updated-product-price').innerHTML).toFixed(2);
    
    var index = added.indexOf(parentRowId);
    //alert(index);
    if (index !== -1) {
        added.splice(index, 1);
    } 
    for (var item of cart.items) {
        if (item.product === parentRowId){
            var index = cart.items.indexOf(item);
            if (index !== -1) {
                cart.items.splice(index, 1);
            }
        }
    }
    alert('¡El artículo se ha eliminado éxito!');
    
    var subtotalRow = document.getElementById("subtotal");
	var subtotalRowParent = subtotalRow.parentNode;
	for (let node of subtotalRowParent.childNodes) {
		if (node.id === "discountRow") {
            var discountRow = document.getElementById("discountRow");
            
            subtotalRowParent.removeChild(discountRow);
        }

	}

    cart.finalDis = 0;
	updateSubtotal();
	updateTotal();

}

// Actualizar cantidad de artículos del mismo tipo
function updateQuantity(event) {
    let parentRow = event.parentNode.parentNode;
    let parentRowId = parentRow.id;
    var inputQuantity,productPrice,updatedPrice,totalPrice;
    
    for (let node of parentRow.childNodes) {
        switch (node.id) {
            case 'quantity':
                inputQuantity = node.firstChild;
                break;
                
            case 'product-price':
                productPrice = Number(node.innerHTML);
                break;
                
            case 'updated-product-price':
                updatedPrice = node;
                totalPrice = Number(node.innerHTML);
                console.log(totalPrice);
        }
    }
    
    let inputQuantityValue = (Number(inputQuantity.value)).toFixed(2);
    
    if (inputQuantityValue <= 0) removeFromCart(event);
    
    totalPrice = inputQuantity.value * productPrice;
    updatedPrice.innerHTML = totalPrice;
    
    for (let item of cart.items) {
        if (item.product === parentRowId) item.productUpdatedPrice = totalPrice;
    }
    
    updateSubtotal();
    updateTotal();
    console.log(cart);
}

//Actualizar subtotal
function updateSubtotal() {
    cart.subtotal = 0;
    
    for (let item of cart.items) {
        cart.subtotal += item.productUpdatedPrice;
        // alert(item.productName);
    }
    
    subtotal.innerHTML = cart.subtotal.toFixed(2);
}

//Actualizar total
function updateTotal() {
    total.innerHTML = cart.subtotal.toFixed(2);
}