// https://forkify-api.herokuapp.com/v2
import State from './model';
import RecipeView from './view/recipeView';
import SearchView from './view/searchView';
import ResultsView from './view/resultsView';
import PaginationView from './view/paginationView';
import bookMarksView from './view/bookMarksView';
import AddRecipeView from './view/addRecipeView';
import addRecipeView from './view/addRecipeView';

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
    bookMarksView.render(State.data.bookMarks);


    if (State.data.bookMarks.some(el => el.id === State.data.recipe.id)) {
      State.data.recipe.bookMarked = true;
    } else {
      State.data.recipe.bookMarked = false;
    }
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

const bookmark = () => {
  if (!State.data.recipe.bookMarked) {
    State.addBookMark(State.data.recipe);
  } else {
    State.deletBookMark(State.data.recipe.id);
  }

  bookMarksView.render(State.data.bookMarks);
  RecipeView.update(State.data.recipe);
}


const addRecipeController = async (data) => {
  try {
    addRecipeView.renderSpinner();
    await State.uploadRecipe(data);
    addRecipeView.renderMessage('oke !!');
    State.addBookMark(State.data.recipe);
    bookMarksView.render(State.data.bookMarks);
  } catch (e) {
    addRecipeView.renderError(e);
  }
}

const init = () => {
  RecipeView.addHandlerRender(showRecipeController);
  RecipeView.addHandlerUpdateRecipe(updateServingsController);
  RecipeView.addHandlerBookMark(bookmark);
  SearchView.addHandlerRender(searchController);
  PaginationView.addHandlerClick(paginationController);
  AddRecipeView.addHandlerSubmit(addRecipeController);
}
init();

