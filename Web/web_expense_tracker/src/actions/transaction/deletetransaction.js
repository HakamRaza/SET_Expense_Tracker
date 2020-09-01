export const NAME = "TRANSACTION";

export const DELETE_TRANSACTION = `${NAME}/DELETE_TRANSACTION`;
export const DELETE_TRANSACTION_SUCCESS = `${NAME}/DELETE_TRANSACTION_SUCCESS`;
export const DELETE_TRANSACTION_FAIL = `${NAME}/DELETE_TRANSACTION_FAIL`;
export const RESET_DELETE_TRANSACTION = `${NAME}/RESET_DELETE_TRANSACTION`;

              // is used in container                     //same as below first child
export const deleteTransactionData = store => store[NAME].delete_transaction;

// action name in container
export const delete_transaction = data => ({
  type: DELETE_TRANSACTION,
  data
});

export const delete_transactionSuccess = data => ({
  type: DELETE_TRANSACTION_SUCCESS,
  data
});

export const delete_transactionFail = error => ({
  type: DELETE_TRANSACTION_FAIL,
  error
});

export const resetdelete_transaction = () => ({
  type: RESET_DELETE_TRANSACTION
});
