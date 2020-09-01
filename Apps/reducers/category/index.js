import { combineReducers } from "redux";

import newCategory from "./newCategory";
import updateCategory from "./updateCategory";
import deleteCategory from "./deleteCategory";
import getCategory from "./getCategories";

export default combineReducers({
  newCategory,
  updateCategory,
  deleteCategory,
  getCategory,
});
