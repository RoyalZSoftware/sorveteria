/**
 * @typedef {Object} Product
 * @property {string} name
 */

const ProductNameIsInvalid = new Error("Product name is invalid");

let store = JSON.parse(window.localStorage.getItem('store') ?? '[]');
let idx = +(window.localStorage.getItem('idx') ?? 0) + 1;

function id() {
  const newId = idx++;
  window.localStorage.setItem('idx', newId);
  return newId;
}

/**
 * @param {string} id
 * @param {string} name
 * @returns {Product}
 */
function newProduct(name) {
  if (!name) throw ProductNameIsInvalid;
  return {
    id: id(),
    name,
  };
}

function save() {
  window.localStorage.setItem('store', JSON.stringify(store));
}

function storeProduct(product) {
  store.push(product);
  save();
}

function removeProduct(id) {
  store = store.filter(c => c.id !== id);
  save();
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
