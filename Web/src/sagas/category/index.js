import { all, fork } from "redux-saga/effects";
import getcategories from "./getcategories";
import newcategory from "./newcategory";
import updatecategory from "./updatecategory";
import deletecategory from "./deletecategory";

export default function* home() {
  yield all([
    //only used for this file
    fork(getcategories), 
    fork(deletecategory), 
    fork(updatecategory),
    fork(newcategory)
  ]);
}
