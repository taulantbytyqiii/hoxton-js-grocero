/*

This is how an item object should look like

{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}

*/

let state = [
  {
    id: 01,
    name: "beetroot",
    price: 0.35,
    quantityOnCart: 0,
  },
  {
    id: 02,
    name: "carrot",
    price: 0.45,
    quantityOnCart: 0,
  },
  {
    id: 03,
    name: "apple",
    price: 0.7,
    quantityOnCart: 0,
  },
  {
    id: 04,
    name: "apricot",
    price: 0.25,
    quantityOnCart: 0,
  },
  {
    id: 05,
    name: "avocado",
    price: 0.5,
    quantityOnCart: 0,
  },
  {
    id: 06,
    name: "bananas",
    price: 0.8,
    quantityOnCart: 0,
  },
  {
    id: 07,
    name: "bell-pepper",
    price: 1,
    quantityOnCart: 0,
  },
  {
    id: 08,
    name: "berry",
    price: 0.95,
    quantityOnCart: 0,
  },
  {
    id: 09,
    name: "blueberry",
    price: 0.35,
    quantityOnCart: 0,
  },
  {
    id: 10,
    name: "eggplant",
    price: 1.2,
    quantityOnCart: 0,
  },
];
let total = 0.0;

function renderProducts() {
  for (let product of state) {
    let item = document.createElement("li");

    let productImageWrapper = document.createElement("div");
    productImageWrapper.className = "store--item-icon";

    let productImage = document.createElement("img");
    productImage.src =
      product.id < 10
        ? `assets/icons/00${product.id}-${product.name}.svg`
        : `assets/icons/0${product.id}-${product.name}.svg`;
    productImage.alt = product.name;

    let addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to cart";
    addToCartBtn.addEventListener("click", () => {
      addProductToCart(product);
    });

    productImageWrapper.appendChild(productImage);
    item.append(productImageWrapper, addToCartBtn);

    document.querySelector(".store--item-list").appendChild(item);
  }
}
function incrementQuantityOnCart(product) {
  product.quantityOnCart++;
  total += product.price;
  document.querySelector(".total-number").textContent = `£${total.toFixed(2)}`;
  return product.quantityOnCart;
}
function addProductToCart(product) {
  if (product.quantityOnCart === 0) {
    let cartItem = document.createElement("li");
    let cartProductImage = document.createElement("img");
    cartProductImage.className = "cart--item-icon";
    cartProductImage.src =
      product.id < 10
        ? `assets/icons/00${product.id}-${product.name}.svg`
        : `assets/icons/0${product.id}-${product.name}.svg`;
    cartProductImage.alt = product.name;

    let cartProductName = document.createElement("p");
    cartProductName.textContent = product.name;

    let decrementQuantity = document.createElement("button");
    decrementQuantity.className = "quantity-btn remove-btn center";
    decrementQuantity.textContent = "-";
    decrementQuantity.addEventListener("click", () => {
      decrementQuantityOnCart(product);
    });

    let cartProductQuantity = document.createElement("span");
    cartProductQuantity.className = "quantity-text center";
    cartProductQuantity.textContent = incrementQuantityOnCart(product);
    product.cartProductQuantityElement = cartProductQuantity;

    let incrementQuantity = document.createElement("button");
    incrementQuantity.className = "quantity-btn add-btn center";
    incrementQuantity.textContent = "+";
    incrementQuantity.addEventListener("click", () => {
      product.cartProductQuantityElement.textContent =
        incrementQuantityOnCart(product);
    });

    cartItem.append(
      cartProductImage,
      cartProductName,
      decrementQuantity,
      product.cartProductQuantityElement,
      incrementQuantity
    );
    document.querySelector(".cart--item-list").appendChild(cartItem);
  } else {
    product.cartProductQuantityElement.textContent =
      incrementQuantityOnCart(product);
  }
}
function decrementQuantityOnCart(product) {
  product.quantityOnCart--;
  total -= product.price;
  document.querySelector(".total-number").textContent = `£${total.toFixed(2)}`;
  if (product.quantityOnCart === 0) {
    product.cartProductQuantityElement.parentNode.remove();
  }
  product.cartProductQuantityElement.textContent = product.quantityOnCart;
  return product.quantityOnCart;
}

renderProducts();
