/**
 * @typedef {Object} Product
 * @property {string} name
 */

const ProductNameIsInvalid = new Error("Product name is invalid");

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

async function storeProduct(product) {
  store.push(product);
}

async function removeProduct(id) {
  store = store.filter(c => c.id !== id);
}

async function listProducts() {
  const db = window.firebase.getFirestore(window.firebase.app);
  const q = window.firebase.query(window.firebase.collection(db, "products"));
  return window.firebase.getDocs(q);
}

async function findProduct(id) {
  return store.find(c => c.id == id);
}

async function updateProduct(id, product) {
  const found = findProduct(id);
  removeProduct(id);
  storeProduct({id, ...found, ...product});
}
