/**
 * @param {Product} product
 */
function uiProductListItem(product) {
  const item = document.createElement("li");
  item.innerText = product.name;
  return item;
}

function uiAddProduct() {
  console.log(uiLoading.isLoading);
  const productName = document.getElementById("product-name");
  try {
    const product = newProduct(productName.value);
    storeProduct(product);
    uiRefresh();
    productName.value = "";
  } catch {}
}

function uiRefresh() {
  uiLoading.start();
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";
  const products = listProducts();
  products.forEach((product) => productsContainer.appendChild(uiProductListItem(product)));
  setTimeout(() => uiLoading.stop(), 300);
}

