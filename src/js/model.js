import { API_URL, TIME_OVER, RECIPE_OF_PAGE } from "./config";
import * as helpers from './helpers';

class State {
    data = {
        results: [],
        recipe: {},
        bookMarks: []
    }

    async loadRecipe(id) {
        try {
            const data = await Promise.race(
                [helpers.callApi(`${API_URL}${id}`), helpers.timeOut(TIME_OVER)]
            );
            let { recipe } = data.data;
            recipe = {
                cookingTime: recipe.cooking_time,
                id: recipe.id,
                image: recipe.image_url,
                ingredients: recipe.ingredients,
                publisher: recipe.publisher,
                servings: recipe.servings,
                sourceUrl: recipe.source_url,
                title: recipe.title
            }
            this.data.recipe = recipe;
        } catch (e) {
            throw e;
        }
    }

    async searchRecipe(query) {
        try {
            const data = await helpers.callApi(`${API_URL}?search=${query}`)
            if (!data || data.data.recipes.length === 0) {
                throw new Error('Không có dữ liệu')
            }
            const results = data.data.recipes.map((recipe) => {
                return {
                    id: recipe.id,
                    image: recipe.image_url,
                    publisher: recipe.publisher,
                    title: recipe.title
                }
            })
            this.data.results = results;
            return results;
        } catch (e) {
            throw e;
        }
    }

    recipePage(page) {
        const start = (page - 1) * RECIPE_OF_PAGE;
        const end = page * RECIPE_OF_PAGE;
        const recipes = this.data.results.slice(start, end);
        return recipes;
    }

    updateServings(newServings) {
        this.data.recipe.ingredients.forEach(element => {
            element.quantity = element.quantity * newServings / this.data.recipe.servings;
        });
        this.data.recipe.servings = newServings;
    }

    addBookMark(recipe) {
        if(this.data.recipe.id === recipe.id) {
            this.data.recipe.bookMarked = true;
            this.data.bookMarks.push(recipe);
            this.saveBookMarkLocalStorage(this.data.bookMarks)
        }
    }
    deletBookMark(id) {
        if(this.data.recipe.id === id) {
            this.data.recipe.bookMarked = false;
            const index = this.data.bookMarks.findIndex(el => {
                el.id === id;
            }) 
            this.data.bookMarks.splice(index);
            this.saveBookMarkLocalStorage(this.data.bookMarks)
        }
    }

    getBookMarksLocalStorage () {
        const bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
        this.data.bookMarks = bookMarks;
    }

    saveBookMarkLocalStorage(bookMarks) {
        localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    }
}
export default new State();



