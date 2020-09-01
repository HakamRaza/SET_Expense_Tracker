import { combineReducers } from "redux";

import update_category from "./updatecategories";
import get_categories from "./getcategories";
import new_category from "./newcategories";
import delete_category from "./deletecategories";

//combine to export
export default combineReducers({
  //same as funtion name inside
  delete_category,
  update_category,
  new_category,
  get_categories,
});
