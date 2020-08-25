import auth from "./auth";
import profile from "./profile";
import category from "./category";
import transactions from "./transactions";

export default {
  ...auth,
  ...profile,
  ...category,
  ...transactions
};