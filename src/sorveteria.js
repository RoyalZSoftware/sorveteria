/**
 * @typedef {Object} Product
 * @property {string} name
 * @property {Date | null} deleted_at
 */

const ProductNameIsInvalid = new Error("Product name is invalid");

/**
 * @param {string} name
 * @param {boolean} deleted_at
 * @returns {Product}
 */
function newProduct(name) {
  if (!name || name.length < 3 || name.length > 128) throw ProductNameIsInvalid;
  return {
    name,
    deleted_at: null,
  };
}

async function storeProduct(product) {
  const db = firebase.firestore();
  return db.collection("products").add(product);
}

async function removeProduct(id) {
  const db = firebase.firestore();
  return db.collection("products").doc(id).update({deleted_at: new Date()});
}

async function listProducts() {
  const db = firebase.firestore();
  return db.collection("products").where("deleted_at", "!=", null).get();
}

