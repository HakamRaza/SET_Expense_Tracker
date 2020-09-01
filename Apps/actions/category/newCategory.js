export const NAME = "CATEGORY"; //folder name


//TYPE NAME
export const NEW_CATEGORY = `${NAME}/NEW_CATEGORY`;
export const NEW_CATEGORY_SUCCESS = `${NAME}/NEW_CATEGORY_SUCCESS`;
export const NEW_CATEGORY_FAIL = `${NAME}/NEW_CATEGORY_FAIL`;

export const getNewCategoryData = (store) => store[NAME].newCategory;

//create action functions
export const newCategory = data => ({
    type: NEW_CATEGORY,
    data: data,
})

export const newCategorySuccess= data => ({
    type: NEW_CATEGORY_SUCCESS,
    data: data,
})

export const newCategoryFail= error => ({
    type: NEW_CATEGORY_FAIL,
    error: error,
})