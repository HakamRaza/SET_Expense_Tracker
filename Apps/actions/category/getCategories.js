export const NAME = "CATEGORY"; //folder name


//TYPE NAME
export const GET_CATEGORY = `${NAME}/GET_CATEGORY`;
export const GET_CATEGORY_SUCCESS = `${NAME}/GET_CATEGORY_SUCCESS`;
export const GET_CATEGORY_FAIL = `${NAME}/GET_CATEGORY_FAIL`;

export const getGetCategoryData = (store) => store[NAME].getCategory;
//create action functions
export const getCategory = data => ({
    type: GET_CATEGORY,
    data: data,
})

export const getCategorySuccess= data => ({
    type: GET_CATEGORY_SUCCESS,
    data: data,
})

export const getCategoryFail= error => ({
    type: GET_CATEGORY_FAIL,
    error: error,
})