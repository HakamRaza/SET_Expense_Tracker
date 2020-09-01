export const NAME = "CATEGORY"; //folder name

//TYPE NAME
export const DELETE_CATEGORY = `${NAME}/DELETE_CATEGORY`;
export const DELETE_CATEGORY_SUCCESS = `${NAME}/DELETE_CATEGORY_SUCCESS`;
export const DELETE_CATEGORY_FAIL = `${NAME}/DELETE_CATEGORY_FAIL`;

export const getDelCategoryData = (store) => store[NAME].delete_category;

//delete action functions
export const delete_category = data => ({
    type: DELETE_CATEGORY,
    data: data,
})

export const delete_categorySuccess= data => ({
    type: DELETE_CATEGORY_SUCCESS,
    data: data,
})

export const delete_categoryFail= error => ({
    type: DELETE_CATEGORY_FAIL,
    error: error,
})