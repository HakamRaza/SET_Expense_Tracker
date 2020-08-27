export const NAME = "CATEGORY"; //folder name

//TYPE NAME
export const DELETE_CATEGORY = `${NAME}/DELETE_CATEGORY`;
export const DELETE_CATEGORY_SUCCESS = `${NAME}/DELETE_CATEGORY_SUCCESS`;
export const DELETE_CATEGORY_FAIL = `${NAME}/DELETE_CATEGORY_FAIL`;

export const delCategoryData = (store) => store[NAME].delete_categories;

//delete action functions
export const delete_categories = data => ({
    type: DELETE_CATEGORY,
    data: data,
})

export const delete_categoriesSuccess= data => ({
    type: DELETE_CATEGORY_SUCCESS,
    data: data,
})

export const delete_categoriesFail= error => ({
    type: DELETE_CATEGORY_FAIL,
    error: error,
})