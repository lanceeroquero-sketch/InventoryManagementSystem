import {
  loadState,
  validateProduct,
  getProduct,
  setEditingId,
  addProduct,
  updateProduct,
  deleteProduct,
  adjustQuantity,
  setQuery,
  getVisibleProducts,
  getInventorySummary,
} from "./model.js";

import ProductFormView from "./views/ProductFormView.js";
import ProductListView from "./views/ProductListView.js";
import SearchView from "./views/SearchView.js";
import DashboardView from "./views/DashboardView.js";

const controlRender = () => {
  ProductListView.render(getVisibleProducts());
  DashboardView.render(getInventorySummary());
};

const controlSubmitProduct = (product) => {
  ProductFormView.clearError();

  const error = validateProduct(product);

  if (error) {
    ProductFormView.renderFormError(error);
    return;
  }

  if (product.id) {
    updateProduct(product.id, product);
  } else {
    addProduct(product);
  }

  setEditingId(null);
  ProductFormView.renderForm();
  controlRender();
};

const controlEditProduct = (id) => {
  const product = getProduct(id);

  if (!product) return;

  setEditingId(id);
  ProductFormView.renderForm(product);
};

const controlDeleteProduct = (id) => {
  const wasEditing = deleteProduct(id);

  if (wasEditing) ProductFormView.renderForm();

  controlRender();
};

const controlIncreaseQuantity = (id) => {
  adjustQuantity(id, 1);
  controlRender();
};

const controlDecreaseQuantity = (id) => {
  adjustQuantity(id, -1);
  controlRender();
};

const controlSearch = (query) => {
  setQuery(query);
  controlRender();
};

const init = () => {
  loadState();

  ProductFormView.renderForm();
  ProductFormView.addSubmitHandler(controlSubmitProduct);

  ProductListView.addEditHandler(controlEditProduct);
  ProductListView.addDeleteHandler(controlDeleteProduct);
  ProductListView.addIncreaseHandler(controlIncreaseQuantity);
  ProductListView.addDecreaseHandler(controlDecreaseQuantity);

  SearchView.addSearchHandler(controlSearch);

  controlRender();
};

init();
