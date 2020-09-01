export const NAME = "CATEGORY"; //folder name


//TYPE NAME
export const DELETE_CATEGORY = `${NAME}/DELETE_CATEGORY`;
export const DELETE_CATEGORY_SUCCESS = `${NAME}/DELETE_CATEGORY_SUCCESS`;
export const DELETE_CATEGORY_FAIL = `${NAME}/DELETE_CATEGORY_FAIL`;

export const getDeleteCategoryData = (store) => store[NAME].deleteCategory;

//delete action functions
export const deleteCategory = data => ({
    type: DELETE_CATEGORY,
    data: data,
})

export const deleteCategorySuccess= data => ({
    type: DELETE_CATEGORY_SUCCESS,
    data: data,
})

export const deleteCategoryFail= error => ({
    type: DELETE_CATEGORY_FAIL,
    error: error,
})