import View from "./View.js";

class ProductListView extends View {
  _parentElement = document.querySelector("#product-list");
  _errorMessage = "No products available.";

  _generateMarkup = () => {
    return this._data
      .map(
        (product) => `
          <li class="product-item" data-id="${product.id}">
            <div class="product-info">
              <h3>${product.name}</h3>
              <p>Category: ${product.category}</p>
              <p>Price: ₱${product.price.toFixed(2)}</p>
              <p>Quantity: ${product.quantity}</p>
              <p>
                Stock Value:
                ₱${(product.price * product.quantity).toFixed(2)}
              </p>
            </div>

            <div class="product-actions">
              <button
                type="button"
                class="btn-edit"
                data-id="${product.id}"
              >
                Edit
              </button>

              <button
                type="button"
                class="btn-delete"
                data-id="${product.id}"
              >
                Delete
              </button>

              <button
                type="button"
                class="btn-increase"
                data-id="${product.id}"
              >
                + Stock
              </button>

              <button
                type="button"
                class="btn-decrease"
                data-id="${product.id}"
              >
                - Stock
              </button>
            </div>
          </li>
        `
      )
      .join("");
  };

  addEditHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const button = e.target.closest(".btn-edit");

      if (!button) return;

      const id = Number(button.dataset.id);

      handler(id);
    });
  }

  addDeleteHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const button = e.target.closest(".btn-delete");

      if (!button) return;

      const id = Number(button.dataset.id);

      handler(id);
    });
  }

  addIncreaseHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const button = e.target.closest(".btn-increase");

      if (!button) return;

      const id = Number(button.dataset.id);

      handler(id);
    });
  }

  addDecreaseHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const button = e.target.closest(".btn-decrease");

      if (!button) return;

      const id = Number(button.dataset.id);

      handler(id);
    });
  }
}

export default new ProductListView();