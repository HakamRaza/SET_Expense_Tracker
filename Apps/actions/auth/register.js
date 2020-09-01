export const NAME = "AUTH"; //folder name


//TYPE NAME
export const REGISTER = `${NAME}/REGISTER`;
export const REGISTER_SUCCESS = `${NAME}/REGISTER_SUCCESS`;
export const REGISTER_FAIL = `${NAME}/REGISTER_FAIL`;

export const getRegisterData = (store) => store[NAME].register;
//create action functions
export const register = data => ({
    type: REGISTER,
    data: data,
})

export const registerSuccess= data => ({
    type: REGISTER_SUCCESS,
    data: data,
})

export const registerFail= error => ({
    type: REGISTER_FAIL,
    error: error,
})