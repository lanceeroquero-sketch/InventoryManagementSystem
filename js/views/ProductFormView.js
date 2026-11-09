import View from "./View.js";

class ProductFormView extends View {
  _parentElement = document.querySelector("#product-form");
  _errorMessage = "Please enter valid product information.";

  addSubmitHandler(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(this._parentElement);

      const product = {
        id: formData.get("id") ? Number(formData.get("id")) : null,
        name: formData.get("name").trim(),
        category: formData.get("category").trim(),
        price: formData.get("price"),
        quantity: formData.get("quantity"),
      };

      handler(product);
    });
  }

  renderForm(product = {}) {
    this._parentElement.innerHTML = `
      <input
        type="hidden"
        name="id"
        value="${product.id || ""}"
      />

      <div class="form-group">
        <label for="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          name="name"
          value="${product.name || ""}"
          placeholder="Enter product name"
        />
      </div>

      <div class="form-group">
        <label for="product-category">Category</label>
        <input
          type="text"
          id="product-category"
          name="category"
          value="${product.category || ""}"
          placeholder="Enter category"
        />
      </div>

      <div class="form-group">
        <label for="product-price">Price</label>
        <input
          type="number"
          id="product-price"
          name="price"
          value="${product.price ?? ""}"
          placeholder="Enter price"
          min="0"
          step="0.01"
        />
      </div>

      <div class="form-group">
        <label for="product-quantity">Quantity</label>
        <input
          type="number"
          id="product-quantity"
          name="quantity"
          value="${product.quantity ?? ""}"
          placeholder="Enter quantity"
          min="0"
        />
      </div>

      <p class="form-error" id="form-error"></p>

      <button type="submit" class="btn">
        ${product.id ? "Update Product" : "Add Product"}
      </button>
    `;
  }

  renderError(message) {
    const errorElement = this._parentElement.querySelector("#form-error");

    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  clearError() {
    const errorElement = this._parentElement.querySelector("#form-error");

    if (errorElement) {
      errorElement.textContent = "";
    }
  }
}

export default new ProductFormView();