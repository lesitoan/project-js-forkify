// https://forkify-api.herokuapp.com/v2
import State from './model';
import RecipeView from './view/recipeView';
import SearchView from './view/searchView';
import ResultsView from './view/resultsView';
import PaginationView from './view/paginationView';
const showRecipeController = async () => {
  try {
    RecipeView.renderSpinner();
    const id = window.location.hash.slice(1);
    if (!id) throw new Error('Chưa có kết quả !!!!!!!');

    // update results view to mark selected search result
    const recipes = State.recipePage(1);
    ResultsView.update(recipes);
    // ----------------------------------

    await State.loadRecipe(id);
    const recipe = State.data.recipe;
    RecipeView.render(recipe);
  } catch (e) {
    console.log(e);
    RecipeView.renderError();
  }
}

const searchController = async () => {
  try {
    const query = SearchView.renderSearch();
    if (!query) return;
    ResultsView.renderSpinner();
    await State.searchRecipe(query);
    const results = State.data.results;
    const recipes = State.recipePage(1);
    ResultsView.render(recipes);
    PaginationView.render({ currentPage: 1, results });
  } catch (e) {
    console.log(e);
    ResultsView.renderError();
  }
}

const paginationController = (goToPage) => {
  const recipes = State.recipePage(goToPage);
  ResultsView.render(recipes);
  PaginationView.render({ currentPage: goToPage, results: State.data.results });
}

const updateServingsController = (newServings) => {
  State.updateServings(newServings);
  // RecipeView.render(State.data.recipe)
  RecipeView.update(State.data.recipe);
}

const init = () => {
  RecipeView.addHandlerRender(showRecipeController);
  RecipeView.addHandlerUpdateRecipe(updateServingsController);
  SearchView.addHandlerRender(searchController);
  PaginationView.addHandlerClick(paginationController);
}
init();

