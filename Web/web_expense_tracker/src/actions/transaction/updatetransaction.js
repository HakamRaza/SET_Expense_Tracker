export const NAME = "TRANSACTION";

export const UPDATE_TRANSACTION = `${NAME}/UPDATE_TRANSACTION`;
export const UPDATE_TRANSACTION_SUCCESS = `${NAME}/UPDATE_TRANSACTION_SUCCESS`;
export const UPDATE_TRANSACTION_FAIL = `${NAME}/UPDATE_TRANSACTION_FAIL`;
export const RESET_UPDATE_TRANSACTION = `${NAME}/RESET_UPDATE_TRANSACTION`;

              // is used in container                     //same as below first child
export const updateTransactionData = store => store[NAME].update_transaction;

// action name in container
export const update_transaction = data => ({
  type: UPDATE_TRANSACTION,
  data
});

export const update_transactionSuccess = data => ({
  type: UPDATE_TRANSACTION_SUCCESS,
  data
});

export const update_transactionFail = error => ({
  type: UPDATE_TRANSACTION_FAIL,
  error
});

export const resetupdate_transaction = () => ({
  type: RESET_UPDATE_TRANSACTION
});
