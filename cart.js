let carts = document.querySelectorAll('.add-to-cart');

let products = [
  {
    name: 'Danielle Steel',
    tag: 'bookdanielle',
    type: 'E-book',
    price: 2500,
    inCart: 0, 
  },

  {
    name: 'Educated',
    tag: 'bookeducated',
    type: 'E-book',
    price: 2500,
    inCart: 0, 
  },

  {
    name: 'Memory',
    tag: 'bookmemory',
    type: 'E-book',
    price: 2500,
    inCart: 0, 
  },

  {
    name: 'The King of Drugs',
    tag: 'booknora',
    type: 'E-book',
    price: 2500,
    inCart: 0, 
  }
];

for (let i=0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
      cartNumbers(products[i]);
      totalCost(products[i])
    })
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  console.log(productNumbers)

  if(productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(products) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if(productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else{
  localStorage.setItem('cartNumbers', 1);
  document.querySelector('.cart span').textContent = 1;
  }

  setItems(products);

}

function setItems(products) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if(cartItems !=null) {
      if( cartItems[products.tag] == undefined) {
          cartItems = {
              ...cartItems,
              [products.tag] : products
          }
      }
      cartItems[products.tag].inCart += 1;
  } else{
          products.inCart = 1;
              cartItems = {
                  [products.tag]: products
              }
      }
  localStorage.setItem("productsInCart", JSON.stringify
  (cartItems));
}
 
function totalCost(products) {
  let cartCost = localStorage.getItem('totalCost');

  console.log("My cartCost is", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + products.price);
  } else {
    localStorage.setItem("totalCost", products.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cartContainer = document.querySelector
  (".cartcontainer");

  console.log(cartItems);
  if(cartItems && cartContainer){
    cartContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      cartContainer.innerHTML += `
      <div class="products">
        <img src="assets/${item.tag}.png">
            <span>${item.name}</span>
            <div class="price">${item.price}</div>
              <i class="fas fa-times"></i>
      </div>

      
      <div></div>
      `
    });   
  }
        

}

onLoadCartNumbers();
displayCart();
  