import * as newtransaction from "./newtransaction";
import * as gettransaction from "./gettransaction";
import * as updatetransaction from "./updatetransaction";
import * as deletetransaction from "./deletetransaction";

export default {
  ...updatetransaction,
  ...gettransaction,
  ...newtransaction,
  ...deletetransaction,
};
