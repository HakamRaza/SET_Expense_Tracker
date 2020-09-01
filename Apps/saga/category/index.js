import { all, fork } from "redux-saga/effects";
import newCategory from "./newCategory";
import updateCategory from "./updateCategory";
import deleteCategory from "./deleteCategory";
import getCategories from "./getCategories";

export default function* home() {
  yield all([
    fork(getCategories), 
    fork(deleteCategory), 
    fork(updateCategory),
    fork(newCategory)
  ]);
}

