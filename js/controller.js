import {
  state,
  loadState,
  addProduct,
  updateProduct,
  deleteProduct,
  updateQuantity,
  searchProducts,
  getInventorySummary,
} from "./model.js";

import ProductFormView from "./views/ProductFormView.js";
import ProductListView from "./views/ProductListView.js";
import SearchView from "./views/SearchView.js";
import DashboardView from "./views/DashboardView.js";

const controlRender = () => {
  ProductListView.render(state.products);
  DashboardView.render(getInventorySummary());
};

const controlSubmitProduct = (product) => {
  ProductFormView.clearError();

  if (!product.name) {
    ProductFormView.renderError("Product name is required.");
    return;
  }

  if (!product.category) {
    ProductFormView.renderError("Category is required.");
    return;
  }

  if (product.price === "" || Number(product.price) < 0) {
    ProductFormView.renderError("Price must be 0 or greater.");
    return;
  }

  if (product.quantity === "" || Number(product.quantity) < 0) {
    ProductFormView.renderError("Quantity must be 0 or greater.");
    return;
  }

  if (product.id) {
    updateProduct(product.id, product);
  } else {
    addProduct(product);
  }

  ProductFormView.renderForm();
  controlRender();
};

const controlEditProduct = (id) => {
  const product = state.products.find((product) => product.id === id);

  if (!product) return;

  ProductFormView.renderForm(product);
};

const controlDeleteProduct = (id) => {
  deleteProduct(id);

  controlRender();
};

const controlIncreaseQuantity = (id) => {
  const product = state.products.find((product) => product.id === id);

  if (!product) return;

  updateQuantity(id, product.quantity + 1);

  controlRender();
};

const controlDecreaseQuantity = (id) => {
  const product = state.products.find((product) => product.id === id);

  if (!product) return;

  if (product.quantity <= 0) return;

  updateQuantity(id, product.quantity - 1);

  controlRender();
};

const controlSearch = (query) => {
  const results = searchProducts(query);

  ProductListView.render(results);
};

const init = () => {
  loadState();

  ProductFormView.renderForm();

  ProductFormView.addSubmitHandler(controlSubmitProduct);

  ProductListView.addEditHandler(controlEditProduct);
  ProductListView.addDeleteHandler(controlDeleteProduct);
  ProductListView.addIncreaseHandler(controlIncreaseQuantity);
  ProductListView.addDecreaseHandler(controlDecreaseQuantity);

  SearchView.addInputHandler(controlSearch);

  controlRender();
};

init();