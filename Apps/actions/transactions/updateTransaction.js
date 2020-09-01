export const NAME = "TRANSACTIONS"; //folder name


//TYPE NAME
export const UPDATE_TRANSACTION = `${NAME}/UPDATE_TRANSACTION`;
export const UPDATE_TRANSACTION_SUCCESS = `${NAME}/UPDATE_TRANSACTION_SUCCESS`;
export const UPDATE_TRANSACTION_FAIL = `${NAME}/UPDATE_TRANSACTION_FAIL`;

export const getUpdateTransaction = (store) => store[NAME].updateTransaction;

//create action functions
export const updateTransaction = data => ({
    type: UPDATE_TRANSACTION,
    data: data,
})

export const updateTransactionSucess= data => ({
    type: UPDATE_TRANSACTION_SUCCESS,
    data: data,
})

export const updateTransactionFail= error => ({
    type: UPDATE_TRANSACTION_FAIL,
    error: error,
})