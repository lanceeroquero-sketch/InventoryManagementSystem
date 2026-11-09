const STORAGE_KEY = "inventory-management-system";

export const state = {
  products: [],
  query: "",
  editingId: null,
};

const saveState = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ products: state.products })
  );
};

export const loadState = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) return;

    state.products = JSON.parse(storedData).products || [];
  } catch {
    state.products = [];
  }
};

export const validateProduct = ({ name, category, price, quantity }) => {
  if (!name) return "Product name is required.";

  if (!category) return "Category is required.";

  if (price === "" || Number(price) < 0) {
    return "Price must be 0 or greater.";
  }

  if (
    quantity === "" ||
    !Number.isInteger(Number(quantity)) ||
    Number(quantity) < 0
  ) {
    return "Quantity must be a whole number, 0 or greater.";
  }

  return "";
};

export const getProduct = (id) =>
  state.products.find((product) => product.id === id);

export const setEditingId = (id) => {
  state.editingId = id;
};

export const addProduct = (product) => {
  const newProduct = {
    id: Date.now(),
    name: product.name,
    category: product.category,
    price: Number(product.price),
    quantity: Number(product.quantity),
  };

  state.products.push(newProduct);

  saveState();

  return newProduct;
};

export const updateProduct = (id, updatedData) => {
  const product = getProduct(id);

  if (!product) return;

  product.name = updatedData.name;
  product.category = updatedData.category;
  product.price = Number(updatedData.price);
  product.quantity = Number(updatedData.quantity);

  saveState();

  return product;
};

export const deleteProduct = (id) => {
  const wasEditing = state.editingId === id;

  state.products = state.products.filter((product) => product.id !== id);

  if (wasEditing) state.editingId = null;

  saveState();

  return wasEditing;
};

export const adjustQuantity = (id, change) => {
  const product = getProduct(id);

  if (!product) return;

  product.quantity = Math.max(0, product.quantity + change);

  saveState();

  return product;
};

export const setQuery = (query) => {
  state.query = query.trim().toLowerCase();
};

export const getVisibleProducts = () => {
  if (!state.query) return state.products;

  return state.products.filter((product) =>
    product.name.toLowerCase().includes(state.query)
  );
};

export const getInventorySummary = () => {
  const totalProducts = state.products.length;

  const totalStock = state.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const inventoryValue = state.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return {
    totalProducts,
    totalStock,
    inventoryValue,
  };
};
