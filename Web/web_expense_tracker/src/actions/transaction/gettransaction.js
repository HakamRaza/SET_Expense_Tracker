export const NAME = "TRANSACTION";

export const GET_TRANSACTION = `${NAME}/GET_TRANSACTION`;
export const GET_TRANSACTION_SUCCESS = `${NAME}/GET_TRANSACTION_SUCCESS`;
export const GET_TRANSACTION_FAIL = `${NAME}/GET_TRANSACTION_FAIL`;
export const RESET_GET_TRANSACTION = `${NAME}/RESET_GET_TRANSACTION`;

              // is used in container                     //same as below first child
export const getTransactionData = store => store[NAME].get_transaction;

// action name in container
export const get_transaction = data => ({
  type: GET_TRANSACTION,
  data
});

export const get_transactionSuccess = data => ({
  type: GET_TRANSACTION_SUCCESS,
  data
});

export const get_transactionFail = error => ({
  type: GET_TRANSACTION_FAIL,
  error
});

export const resetget_transaction = () => ({
  type: RESET_GET_TRANSACTION
});
