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
  const db = window.firebase.getFirestore(window.firebase.app);
  window.firebase.addDoc(window.firebase.collection(db, "products"), {
    ...product
  });
}

async function removeProduct(id) {
  const db = window.firebase.getFirestore(window.firebase.app);
  return window.firebase.setDoc(window.firebase.doc(db, "products", id), {
    deleted_at: new Date(),
  }, {merge: true});
}

async function listProducts() {
  const db = window.firebase.getFirestore(window.firebase.app);
  const q = window.firebase.query(window.firebase.collection(db, "products"), window.firebase.where("deleted_at", "==", null));
  return window.firebase.getDocs(q);
}

