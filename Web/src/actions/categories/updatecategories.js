export const NAME = "CATEGORY"; //folder name


//TYPE NAME
export const UPDATE_CATEGORY = `${NAME}/UPDATE_CATEGORY`;
export const UPDATE_CATEGORY_SUCCESS = `${NAME}/UPDATE_CATEGORY_SUCCESS`;
export const UPDATE_CATEGORY_FAIL = `${NAME}/UPDATE_CATEGORY_FAIL`;

export const getUpdateCategory = (store) => store[NAME].update_category;

//create action functions
export const update_category = data => ({
    type: UPDATE_CATEGORY,
    data: data,
})

export const update_categorySuccess= data => ({
    type: UPDATE_CATEGORY_SUCCESS,
    data: data,
})

export const update_categoryFail= error => ({
    type: UPDATE_CATEGORY_FAIL,
    error: error,
})