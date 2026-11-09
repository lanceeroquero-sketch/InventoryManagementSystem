import View from "./View.js";

class SearchView extends View {
  _parentElement = document.querySelector("#search-form");
  _input = this._parentElement.querySelector("#search-input");

  addSearchHandler(handler) {
    this._input.addEventListener("input", () => handler(this._input.value));

    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this._input.value);
    });
  }
}

export default new SearchView();
