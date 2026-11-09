import View from "./View.js";

class DashboardView extends View {
  _parentElement = document.querySelector("#dashboard");

  _generateMarkup = () => {
    const { totalProducts, totalStock, inventoryValue } = this._data;

    return `
      <div class="dashboard-card">
        <h3>Total Products</h3>
        <p>${totalProducts}</p>
      </div>

      <div class="dashboard-card">
        <h3>Total Stock</h3>
        <p>${totalStock}</p>
      </div>

      <div class="dashboard-card">
        <h3>Total Inventory Value</h3>
        <p>₱${inventoryValue.toFixed(2)}</p>
      </div>
    `;
  };
}

export default new DashboardView();