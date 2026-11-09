import View from "./View.js";

class SearchView extends View {
  _parentElement = document.querySelector("#search-form");

  addSearchHandler(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const searchInput = this._parentElement.querySelector("#search-input");

      handler(searchInput.value);
    });
  }

  addInputHandler(handler) {
    const searchInput =
      this._parentElement.querySelector("#search-input");

    searchInput.addEventListener("input", (e) => {
      handler(e.target.value);
    });
  }

  clearSearch() {
    const searchInput =
      this._parentElement.querySelector("#search-input");

    searchInput.value = "";
  }
}

export default new SearchView();