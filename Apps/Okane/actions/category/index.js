import * as newCategory from "./newCategory";
import * as updateCategory from "./updateCategory";
import * as deleteCategory from "./deleteCategory";
import * as getCategory from "./getCategories";

export default {
  ...newCategory,
  ...updateCategory,
  ...deleteCategory,
  ...getCategory,
};
