import { menuArray } from "./data.js";

const feed = document.getElementById("feed");
const btn = document.getElementById("btn");
const totalPrice = document.getElementById("total-price");
const orderItems = document.getElementById("order-items");
const modal = document.getElementById("payment-form");
const paymentForm = document.getElementById("payment-form");
const comfirmMessage = document.getElementById("comfirm-message");
let orderedItems = [];
document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    itemsOrder(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeOrder(e.target.dataset.remove);
  } else if (e.target.dataset.complete) {
    completeOrder(e.target.dataset.complete);
  } else if (e.target.dataset.pay) {
    handlePayment(e.target.dataset.pay);
    e.preventDefault();
  }
});

function itemsOrder(itemId) {
  const getOrder = menuArray.filter((menu) => {
    return menu.id === Number(itemId);
    return console.log(menu);
  })[0];

  if (getOrder) {
    orderedItems.push(getOrder);
    renderOrder();

    const orderTotal = orderedItems.reduce(
      (total, current) => total + current.price,
      0
    );

    totalPrice.innerHTML = `<div>
    <p class = "total-price">Total Price: $${orderTotal}</p></div>`;
  }
}

function handlePayment() {
  const formData = new FormData(paymentForm);
  comfirmMessage.innerHTML = `Your order is complete and on its way, ${formData.get(
    "fullname"
  )}`;
  comfirmMessage.style.display = "block";
  orderItems.style.display = "none";
  totalPrice.style.display = "none";
  modal.style.display = "none";
}

function removeOrder(itemId) {
  itemId = Number(itemId);
  let index = orderedItems.findIndex((menu) => itemId === menu.id);
  console.log(index);
  if (index !== -1) {
    orderedItems.splice(index, 1);
  }
  renderOrder();

  const orderTotal = orderedItems.reduce(
    (total, current) => total + current.price,
    0
  );

  totalPrice.innerHTML = `<div>
  <p class = "total-price">Total Price: $${orderTotal}</p></div>`;
}

function completeOrder() {
  if (orderedItems.length !== 0) {
    modal.classList.toggle("hidden");
  }
}

function renderOrder() {
  let html = ``;
  orderedItems.forEach(function (item) {
    html = `
  <div class = "orders">
  <h3>${item.name}</h3>
  <p class ="remove" data-remove ="${item.id}">remove</p>   
  <p>$${item.price}</p>
  </div>
  `;
  });
  orderItems.innerHTML += html;
}

function getFeed() {
  let html = ``;
  menuArray.forEach(function (menu) {
    html += `
    <div class = "menu-style">
        <div class= "emoji-div">
         <p class ="emoji">${menu.emoji}</p>
         </div>
         <div>
       <h3>${menu.name}</h3>
       <p>${menu.ingredients}</p>
       <p>$${menu.price}</p>
       </div>
       <button data-add ="${menu.id}" class="btn">+</button>
    </div>
    `;
  });
  feed.innerHTML = html;
}

function render() {
  const display = getFeed();
}

render();
