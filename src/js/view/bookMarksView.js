import View from "./View";

class BookMarksView extends View {
    _parrentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'Không có kết quả !!!!!!!!!!';

    _generateMarkup(results) {
        const id = window.location.hash.slice(1);

        return results.map((recipe) => {
            return `
            <li class="preview">
                <a class="preview__link ${results.id === id ? 'preview__link--active' : ''} " href="#${recipe.id}">
                <figure class="preview__fig">
                    <img src="${recipe.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.publisher}</p>
                </div>
                </a>
            </li> `;
        }).join("");
    }
}

export default new BookMarksView();