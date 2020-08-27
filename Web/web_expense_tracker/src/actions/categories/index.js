import * as deletecategories from "./deletecategories";
import * as newcategories from "./newcategories";
import * as updatecategories from "./updatecategories";
import * as getcategories from "./getcategories";

export default {
  ...getcategories,
  ...updatecategories,
  ...newcategories,
  ...deletecategories,
};
