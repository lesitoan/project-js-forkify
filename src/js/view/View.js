import icons from 'url:../../img/icons.svg';

export default class View {
  _parrentElement;
  _message = 'Success';
  _errorMessage;
  renderSpinner() {
    const html =
      `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
          `
    this._parrentElement.innerHTML = "";
    this._parrentElement.insertAdjacentHTML('afterbegin', html);
  }

  _generateMarkup(recipe) {
  }

  render(recipe) {
    const markup = this._generateMarkup(recipe);
    this._parrentElement.innerHTML = "";
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
           <p>${message}</p>
        </div>
      `
    this._parrentElement.innerHTML = "";
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `
    this._parrentElement.innerHTML = "";
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    const newMarkup = this._generateMarkup(data);
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const currentElement = Array.from(this._parrentElement.querySelectorAll('*'));
    newElement.forEach((newEl, i) => {
      const curEl = currentElement[i];

      // Update changed TEXT
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }
      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        })
      }
    })
  }
}
