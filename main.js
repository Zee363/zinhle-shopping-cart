document.addEventListener('DOMContentLoaded', (event) => {
function updateCartDisplay(cart) {
  const bagItems = document.getElementById("bag-items");
  const subTotal = document.getElementById("sub-total");
  
  if (!bagItems || !subTotal) {
    console.error("Cart display elements not found");
    return;
  }
  
  bagItems.innerHTML = "";
  let total = 0;
 
  cart.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
        <td>${item.name}</td>
        <td>R${item.price}</td>
        <td>${item.quantity}</td>
        <td>R${(item.price * item.quantity).toFixed(2)}</td>
        <td><button onclick="removeFromCart('${item.id}')">Delete</button></td>
      `;
      bagItems.appendChild(row);
      total += item.price * item.quantity;
    });
    
     subTotal.textContent = `SubTotal: ${total.toFixed(2)}`;
}

function updateCart(product, price, image, id, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex((item) => item.id === id);

  if (index > -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({id, name: product, price: parseFloat(price), image, quantity });
  }

localStorage.setItem('cart', JSON.stringify(cart));
updateCartDisplay(cart);
}

function addToCart(id, product, price, image) {
  updateCart(id, product, price, image);
  alert(`${product} added to cart!`);
}

window.addToCart = addToCart;

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((item) => item.id === id);

  if (index > -1) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }


  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay(cart);
}

window.removeFromCart = removeFromCart;

updateCartDisplay(JSON.parse(localStorage.getItem('cart')) || []);

});
