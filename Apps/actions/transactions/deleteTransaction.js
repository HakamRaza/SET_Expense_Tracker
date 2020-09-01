export const NAME = "TRANSACTIONS"; //folder name


//TYPE NAME
export const DELETE_TRANSACTION = `${NAME}/DELETE_TRANSACTION`;
export const DELETE_TRANSACTION_SUCCESS = `${NAME}/DELETE_TRANSACTION_SUCCESS`;
export const DELETE_TRANSACTION_FAIL = `${NAME}/DELETE_TRANSACTION_FAIL`;

export const getDeleteTransactionData = (store) => store[NAME].deleteTransaction;

//delete action functions
export const deleteTransaction = data => ({
    type: DELETE_TRANSACTION,
    data: data,
})

export const deleteTransactionSuccess= data => ({
    type: DELETE_TRANSACTION_SUCCESS,
    data: data,
})

export const deleteTransactionFail= error => ({
    type: DELETE_TRANSACTION_FAIL,
    error: error,
})