import View from "./View";
import icons from 'url:../../img/icons.svg';

import { RECIPE_OF_PAGE } from "../config";
class PaginationView extends View {
    _parrentElement = document.querySelector('.pagination');
    _errorMessage = 'Không có kết quả tìm kiếm !!!!!!!!!!';


    _generateMarkup(data) {
        const { currentPage, results } = data;
        const pages = Math.ceil(results.length / RECIPE_OF_PAGE);
        if (currentPage === 1 && currentPage < pages) {
            return `
            <button goToPage="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                 <svg class="search__icon">
                    <use href="${icons}g#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        } else if (currentPage > 1 && currentPage < pages) {
            return `
            <button goToPage="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            <button goToPage="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                 <svg class="search__icon">
                    <use href="${icons}g#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        } else if (currentPage === pages) {
            return `
            <button goToPage="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            `;
        } else {
            return '';
        }
    }

    addHandlerClick(callback) {
        this._parrentElement.addEventListener('click', (e) => {
            const button = e.target.closest('.btn--inline')
            if (!button) return;
            const goToPage = +button.getAttribute('goToPage');
            callback(goToPage);
        })
    }
}

export default new PaginationView();