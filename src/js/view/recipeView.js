import icons from 'url:../../img/icons.svg';
import View from './View';

class RecipeView extends View {
  _parrentElement = document.querySelector('.recipe');
  _errorMessage = "Sản phẩm bạn tìm không tồn tại, hãy thử sản phẩm khác !!!"

  _generateMarkup(recipe) {
    return `
    <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
    </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-servings="${recipe.servings - 1}">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-servings="${recipe.servings + 1}">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn-bookMark">
            <svg class="">
              <use href="${icons}#icon-bookmark${(recipe.bookMarked) ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">

            ${recipe.ingredients.map(ingredient => {
      return `
                <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ingredient.unit}</span>
                  ${ingredient.description}
                </div>
              </li>`
    }).join(" ")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }

  addHandlerRender(callback) {
    ['load', 'hashchange'].forEach(even =>
      window.addEventListener(even, callback)
    );
  }

  addHandlerUpdateRecipe(callback) {
    this._parrentElement.addEventListener('click', (e) => {
      const button = e.target.closest('.btn--update-servings');
      if (!button) return;
      const newServings = button.getAttribute('data-update-servings');
      if (+newServings === 0) return;
      callback(+newServings);
    })
  }

  addHandlerBookMark(callback) {
    this._parrentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-bookMark');
      if(!btn) return;
      callback();
    })
  }

}

export default new RecipeView;