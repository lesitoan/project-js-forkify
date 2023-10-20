class SearchView {
    _parrentElement = document.querySelector('.search');
    renderSearch() {
        const query = this._parrentElement.querySelector('.search__field').value;
        this._parrentElement.querySelector('.search__field').value = '';
        return query;
    }

    addHandlerRender(callback) {
        this._parrentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        })
    }
}

export default new SearchView;