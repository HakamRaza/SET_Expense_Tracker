import * as newtransaction from "./newtransaction";
import * as gettransaction from "./gettransaction";
import * as updatetransaction from "./updatetransaction";

export default {
  ...updatetransaction,
  ...gettransaction,
  ...newtransaction,
};
