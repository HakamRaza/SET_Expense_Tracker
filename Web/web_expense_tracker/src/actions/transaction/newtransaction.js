export const NAME = "TRANSACTION";

export const NEW_TRANSACTION = `${NAME}/NEW_TRANSACTION`;
export const NEW_TRANSACTION_SUCCESS = `${NAME}/NEW_TRANSACTION_SUCCESS`;
export const NEW_TRANSACTION_FAIL = `${NAME}/NEW_TRANSACTION_FAIL`;
export const RESET_NEW_TRANSACTION = `${NAME}/RESET_NEW_TRANSACTION`;

              // is used in container                     //same as below first child
export const newTransactionData = store => store[NAME].new_transaction;

// action name in container
export const new_transaction = data => ({
  type: NEW_TRANSACTION,
  data
});

export const new_transactionSuccess = data => ({
  type: NEW_TRANSACTION_SUCCESS,
  data
});

export const new_transactionFail = error => ({
  type: NEW_TRANSACTION_FAIL,
  error
});

export const resetnew_transaction = () => ({
  type: RESET_NEW_TRANSACTION
});
