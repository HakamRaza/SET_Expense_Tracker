export const NAME = "TRANSACTIONS"; //folder name


//TYPE NAME
export const NEW_TRANSACTION = `${NAME}/NEW_TRANSACTION`;
export const NEW_TRANSACTION_SUCCESS = `${NAME}/NEW_TRANSACTION_SUCCESS`;
export const NEW_TRANSACTION_FAIL = `${NAME}/NEW_TRANSACTION_FAIL`;

export const getNewTransactionData = (store) => store[NAME].newTransaction;

//create action functions
export const newTransaction = data => ({
    type: NEW_TRANSACTION,
    data: data,
})

export const newTransactionSuccess= data => ({
    type: NEW_TRANSACTION_SUCCESS,
    data: data,
})

export const newTransactionFail= error => ({
    type: NEW_TRANSACTION_FAIL,
    error: error,
})