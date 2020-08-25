import * as newTransaction from "./newTransaction";
import * as updateTransaction from "./updateTransaction";
import * as deleteTransaction from "./deleteTransaction";
import * as getTransaction from "./getTransaction";

export default {
  ...newTransaction,
  ...updateTransaction,
  ...deleteTransaction,
  ...getTransaction,
};
