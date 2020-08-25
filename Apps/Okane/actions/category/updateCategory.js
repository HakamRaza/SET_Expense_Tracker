export const NAME = "CATEGORY"; //folder name


//TYPE NAME
export const UPDATE_CATEGORY = `${NAME}/UPDATE_CATEGORY`;
export const UPDATE_CATEGORY_SUCCESS = `${NAME}/UPDATE_CATEGORY_SUCCESS`;
export const UPDATE_CATEGORY_FAIL = `${NAME}/UPDATE_CATEGORY_FAIL`;

export const getUpdateCategory = (store) => store[NAME].updateCategory;

//create action functions
export const updateCategory = data => ({
    type: UPDATE_CATEGORY,
    data: data,
})

export const updateCategorySucess= data => ({
    type: UPDATE_CATEGORY_SUCCESS,
    data: data,
})

export const updateCategoryFail= error => ({
    type: UPDATE_CATEGORY_FAIL,
    error: error,
})