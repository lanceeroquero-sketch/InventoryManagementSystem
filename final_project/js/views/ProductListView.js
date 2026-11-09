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
              <h3>${this._escape(product.name)}</h3>
              <p>Category: ${this._escape(product.category)}</p>
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

  _addClickHandler(selector, handler) {
    this._parentElement.addEventListener("click", (e) => {
      const button = e.target.closest(selector);

      if (!button) return;

      handler(Number(button.dataset.id));
    });
  }

  addEditHandler(handler) {
    this._addClickHandler(".btn-edit", handler);
  }

  addDeleteHandler(handler) {
    this._addClickHandler(".btn-delete", handler);
  }

  addIncreaseHandler(handler) {
    this._addClickHandler(".btn-increase", handler);
  }

  addDecreaseHandler(handler) {
    this._addClickHandler(".btn-decrease", handler);
  }
}

export default new ProductListView();
