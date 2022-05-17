const listCart = document.querySelector(".list_cart");
const productCart = [];

function render() {
  createItemList(data);
  if (productCart.length === 0) listCart.innerHTML += `<h1>Carrinho vazio</h1>`
}

const listProducts = document.getElementById("list_products");

function createItemList(arr) {
  listProducts.innerHTML = ''
  for (let item of arr) {
    let cardItem = `
      <li class="item" id="${item.id}">
        <div class="img_product">
          <img src="process.env.PUBLIC_URL${item.img}" alt="">
        </div>
        <div class="item_info">
          <p class="tag_product">${item.tag[0]}</p>
          <h2 class="name_item">${item.nameItem}</h2>
          <p class="description">${item.description}</p>
          <span class="price">${item.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
          <button class="button_add_cart">${item.addCart}</button>
        </div>
      </li>
    `
    listProducts.innerHTML += cardItem
  }
}

function addItemListCart({nameItem, img, value}) {
  if (productCart.length > 0) {
    for (let index in productCart) {
      if (productCart[index].nameItem === nameItem) {
        productCart[index].value += value;
        productCart[index].theAmount++;
        createItemListCart(productCart);
        return;
      }
    }
  }
  productCart.push({nameItem, img, value, theAmount: 1, price: value});
  createItemListCart(productCart);
}

function createItemListCart(arr) {
  infoBuy(productCart)
  listCart.innerHTML = "";
  for (let i in arr) {
    const item = `
      <li class="item_cart" id="${i}">
        <div class="img_product">
          <img src="${arr[i].img}" alt="">
        </div>
        <div>
          <p class="name_item_cart">${arr[i].nameItem}</p>
          <p class="price_cart">${arr[i].value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
          <div class="group_button">
            <button class="btn_remove">-</button>
            <span id="quantidade">${arr[i].theAmount}</span>
            <button class="btn_add">+</button>
          </div>
        </div>
      </li>
    `;

    listCart.innerHTML += item;
  };
};

function infoBuy (arr) {
  const infoBuy = document.querySelector(".info_buy");
  let totalAmount = 0;
  let priceAmount = 0;
  if (arr.length > 0){
    for (let product of arr) {
      totalAmount += product.theAmount;
      priceAmount += product.value
    }
  }

  if (totalAmount > 0 && priceAmount > 0) {
    infoBuy.innerHTML = `
      <li>
        <p>Quantidade Total:</p>
        <span class="quantidade_de_item">${totalAmount}</span>
      </li>
      <li>
        <p>Total:</p>
        <span class="price_total">${priceAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
      </li>
    `
    return
  }
  
  infoBuy.innerHTML = ""
}

render();

const btbMobile = document.querySelector("#btn-mobile");
const btnOpenCartMobile = document.getElementById("button_kart_mobile");
const btnCloseCartMobile = document.getElementById("btn_close_cart");

btbMobile.addEventListener("click", e => {
  const hamburguer = document.querySelector("#btn-mobile span");
  const ulItems = document.querySelector("#navbar ul");
  hamburguer.classList.toggle('active');
  ulItems.classList.toggle('active');
});

btnOpenCartMobile.addEventListener("click", e => {
  const shoppingCart = document.querySelector(".shopping_cart");
  shoppingCart.classList.toggle("active");
});

btnCloseCartMobile.addEventListener("click", e => {
  const shoppingCart = document.querySelector(".shopping_cart");
  shoppingCart.classList.remove("active");
})

listProducts.addEventListener("click", e => {
  if (e.target.classList.contains("button_add_cart")) {
    addItemListCart(data[e.path[2].id - 1]);
  };
})

listCart.addEventListener("click", e => {
  if (e.target.classList.contains("btn_remove")) {
    productCart[e.path[3].id].theAmount --;
    productCart[e.path[3].id].value -= productCart[e.path[3].id].price;
    if (productCart[e.path[3].id].theAmount === 0) productCart.splice(e.path[3].id, 1);
    createItemListCart(productCart);
  }

  if (e.target.classList.contains("btn_add")) {
    productCart[e.path[3].id].theAmount ++;
    productCart[e.path[3].id].value += productCart[e.path[3].id].price;
    createItemListCart(productCart);
  }
})

document.getElementById("search").addEventListener("keyup", e => {
  const fillArray = data.filter(product => {
    return product.nameItem.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
  });
  if (fillArray.length > 0) createItemList(fillArray);
});

const navBar = document.querySelector("#navbar ul");
navBar.addEventListener("click", e => {
  e.preventDefault();
  if (e.path[0].localName === "a") {
    const textElement = e.target.text
    const fillArray = data.filter(product => {
      return product.tag[0].toLowerCase().indexOf(textElement.toLowerCase()) !== -1;
    });

    if (fillArray.length > 0) {
      createItemList(fillArray);
      return
    }

    createItemList(data)
  }
})