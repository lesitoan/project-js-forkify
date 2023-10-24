import { API_URL, TIME_OVER, RECIPE_OF_PAGE, APIKEY } from "./config";
import * as helpers from './helpers';

class State {
    data = {
        results: [],
        recipe: {},
        bookMarks: []
    }

    editRecipe(recipe) {
        return {
            cookingTime: recipe.cooking_time,
            id: recipe.id,
            image: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            title: recipe.title,
            ...(recipe.key && { key: recipe.key })
        }
    }

    async loadRecipe(id) {
        try {
            const data = await Promise.race(
                [helpers.callApi(`${API_URL}${id}`), helpers.timeOut(TIME_OVER)]
            );
            let { recipe } = data.data;
            console.log(recipe);
            recipe = this.editRecipe(recipe);
            this.data.recipe = recipe;
        } catch (e) {
            throw e;
        }
    }

    async searchRecipe(query) {
        try {
            const data = await helpers.callApi(`${API_URL}?search=${query}&key=${APIKEY}`)
            if (!data || data.data.recipes.length === 0) {
                throw new Error('Không có dữ liệu')
            }
            const results = data.data.recipes.map((recipe) => {
                return {
                    id: recipe.id,
                    image: recipe.image_url,
                    publisher: recipe.publisher,
                    title: recipe.title,
                    ...(recipe.key && { key: recipe.key })
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
        if (this.data.recipe.id === recipe.id) {
            this.data.recipe.bookMarked = true;
            this.data.bookMarks.push(recipe);
            this.saveBookMarkLocalStorage(this.data.bookMarks)
        }
    }
    deletBookMark(id) {
        if (this.data.recipe.id === id) {
            this.data.recipe.bookMarked = false;
            const index = this.data.bookMarks.findIndex(el => {
                el.id === id;
            })
            this.data.bookMarks.splice(index);
            this.saveBookMarkLocalStorage(this.data.bookMarks)
        }
    }

    saveBookMarkLocalStorage(bookMarks) {
        localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    }

    constructor() {
        this._getBookMarksLocalStorage();
        console.log('dsdsdsdsd');
    }
    _getBookMarksLocalStorage() {
        const bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
        this.data.bookMarks = bookMarks;
    }


    uploadRecipe = async (newRecipeArr) => {
        try {
            console.log(newRecipeArr)
            const ingredients = newRecipeArr.filter((el) => {
                return el[0].startsWith('ingredient');
            }).map((el) => {
                const [quantity, unit, description] = el[1].split(',');
                if (!quantity && !unit && !description) return;
                return {
                    quantity: quantity ? +quantity : null,
                    description: description ? description : null,
                    unit: unit ? unit : null
                }
            }).filter(ingredient => {
                return ingredient !== undefined;
            })
            console.log(ingredients);
            const dataObj = Object.fromEntries(newRecipeArr);
            const newRecipe = {
                cooking_time: +dataObj.cookingTime,
                image_url: dataObj.image,
                ingredients: ingredients,
                publisher: dataObj.publisher,
                servings: +dataObj.servings,
                source_url: dataObj.sourceUrl,
                title: dataObj.title
            }
            const data = await Promise.race(
                [helpers.postApi(`${API_URL}?key=${APIKEY}`, newRecipe), helpers.timeOut(TIME_OVER)]
            );
            console.log(data)
            let { recipe } = data.data;
            recipe = this.editRecipe(recipe);
            this.data.recipe = recipe;
            console.log(this.data.recipe)
        } catch (e) {
            throw e;
        }
    }
}
export default new State();



