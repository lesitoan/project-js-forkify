import View from "./View";

class AddRecipeView extends View {
    _parrentElement = document.querySelector('.upload');
    _overlay = document.querySelector('.overlay');
    _recipeWindow = document.querySelector('.add-recipe-window');
    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');

    constructor() {
        super();
        this.addHandlerOpen();
        this.addHandlerClose();
        this.addHandlerSubmit();
    }

    handler() {
        this._overlay.classList.toggle('hidden');
        this._recipeWindow.classList.toggle('hidden');
    }

    addHandlerOpen() {
        this._btnOpen.addEventListener('click', this.handler.bind(this));
    }

    addHandlerClose() {
        this._btnClose.addEventListener('click', this.handler.bind(this));
        this._overlay.addEventListener('click', this.handler.bind(this));
    }

    addHandlerSubmit(callback) {
        this._parrentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            // const dataObj = Object.fromEntries(dataArr);
            callback(dataArr);
        })
    }



}

export default new AddRecipeView();


/* 
dùng function thường thì từ khóa "this" sẽ trả về phần tử đang gọi function đó
còn arrow function thì từ khóa 'this' sẽ trả về element cha, cụ thể trong trường 
hợp này là class AddRecipeView

*/