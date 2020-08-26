import auth from "./auth";
import profile from "./profile";
import categories from "./categories";
import transaction from "./transaction";


// importing folder files
export default {
  ...auth,
  ...profile,
  ...categories,
  ...transaction,
};