export const NAME = "TRANSACTIONS"; //folder name


//TYPE NAME
export const GET_TRANSACTIONS = `${NAME}/GET_TRANSACTIONS`;
export const GET_TRANSACTIONS_SUCCESS = `${NAME}/GET_TRANSACTIONS_SUCCESS`;
export const GET_TRANSACTIONS_FAIL = `${NAME}/GET_TRANSACTIONS_FAIL`;

export const getGetTransactionData = (store) => store[NAME].getTransaction;
//create action functions
export const getTransaction = data => ({
    type: GET_TRANSACTIONS,
    data: data,
})

export const getTransactionSucess= data => ({
    type: GET_TRANSACTIONS_SUCCESS,
    data: data,
})

export const getTransactionFail= error => ({
    type: GET_TRANSACTIONS_FAIL,
    error: error,
})