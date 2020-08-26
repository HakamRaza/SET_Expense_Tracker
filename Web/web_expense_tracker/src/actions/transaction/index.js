import * as newtransaction from "./newtransaction";
import * as gettransaction from "./gettransaction";

export default {
  ...gettransaction,
  ...newtransaction,
};
