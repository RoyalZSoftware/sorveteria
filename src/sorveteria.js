/**
 * @typedef {Object} Product
 * @property {string} name
 */

let store = [];

function id() {
  return store.length == 0 ? 0 : store[store.length - 1].id + 1;
}

/**
 * @param {string} id
 * @param {string} name
 * @returns {Product}
 */
function newProduct(name) {
  if (!name) throw new Error("Product name is invalid");
  return {
    id: id(),
    name,
  };
}

function storeProduct(product) {
  store.push(product);
}

function removeProduct(id) {
  store = store.filter(c => c.id);
}

function listProducts() {
  return store;
}

function findProduct(id) {
  return store.find(c => c.id == id);
}

function updateProduct(id, product) {
  const found = findProduct(id);
  removeProduct(id);
  storeProduct({id, ...found, ...product});
}


function createSorveteria() {
}
