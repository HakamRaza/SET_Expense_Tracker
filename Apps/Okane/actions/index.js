import auth from "./auth";
import profile from "./profile";
import category from "./category";
import transactions from "./transactions";
import stats from "./stats";

export default {
  ...auth,
  ...profile,
  ...category,
  ...transactions,
  ...stats
};