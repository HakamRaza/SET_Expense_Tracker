export const NAME = "CATEGORY";

export const GET_CATEGORIES = `${NAME}/GET_CATEGORIES`;
export const GET_CATEGORIES_SUCCESS = `${NAME}/GET_CATEGORIES_SUCCESS`;
export const GET_CATEGORIES_FAIL = `${NAME}/GET_CATEGORIES_FAIL`;
export const RESET_GET_CATEGORIES = `${NAME}/RESET_GET_CATEGORIES`;

              // is used in container                     //same as below first child
export const getCategoriesData = store => store[NAME].get_categories;

// action name in container
export const get_categories = data => ({
  type: GET_CATEGORIES,
  data
});

export const get_categoriesSuccess = data => ({
  type: GET_CATEGORIES_SUCCESS,
  data
});

export const get_categoriesFail = error => ({
  type: GET_CATEGORIES_FAIL,
  error
});

export const resetgetCategories = () => ({
  type: RESET_GET_CATEGORIES
});
