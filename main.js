// Function to add a product to the cart
function addToCart(id, name, price, image) {
  // Ensure price is a number
  if (typeof price !== 'number' || isNaN(price)) {
    console.error('Invalid price:', price);
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProductIndex = cart.findIndex(item => item.id === id);
  
  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Cart updated:', cart);
  alert(`${name} has been added to your cart.`);
}


function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter(item => item.id !== id);

  localStorage.setItem('cart', JSON.stringify(updatedCart));
  console.log('Item removed from cart:', id);
  displayCart(); // Refresh the cart display
}



// Function to display cart items on cart.html
function displayCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.querySelector('#cart-items .bag-items');
  let subTotal = 0;

  cartItemsContainer.innerHTML = '';

  cart.forEach(item => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" style="width: 100px;"/></td>
      <td>${item.name}</td>
      <td>R ${price.toFixed(2)}</td>
      <td>${quantity}</td>
      <td>R ${(price * quantity).toFixed(2)}</td>
      <td><button class="remove-button" data-id="${item.id}">Remove</button></td>
    `;
    
    cartItemsContainer.appendChild(row);
    subTotal += price * quantity;
  });

  document.getElementById('sub-total').innerText = `SubTotal: R ${subTotal.toFixed(2)}`;
  console.log('Cart displayed:', cart);

  // Attach event listeners to all remove buttons
  document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      removeFromCart(id);
    });
  });
}





document.addEventListener('DOMContentLoaded', displayCart);
