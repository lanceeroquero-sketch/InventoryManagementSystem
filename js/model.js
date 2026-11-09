const STORAGE_KEY = "inventory-management-system";

export const state = {
  products: [],
};

const saveState = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (storedData) {
    const parsedData = JSON.parse(storedData);

    state.products = parsedData.products || [];
  }
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
  const product = state.products.find((product) => product.id === id);

  if (!product) return;

  product.name = updatedData.name;
  product.category = updatedData.category;
  product.price = Number(updatedData.price);
  product.quantity = Number(updatedData.quantity);

  saveState();

  return product;
};

export const deleteProduct = (id) => {
  state.products = state.products.filter(
    (product) => product.id !== id
  );

  saveState();
};

export const updateQuantity = (id, quantity) => {
  const product = state.products.find((product) => product.id === id);

  if (!product) return;

  product.quantity = Number(quantity);

  saveState();

  return product;
};

export const searchProducts = (query) => {
  const searchTerm = query.trim().toLowerCase();

  if (!searchTerm) {
    return state.products;
  }

  return state.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
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