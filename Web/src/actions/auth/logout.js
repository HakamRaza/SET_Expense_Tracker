export const NAME = "AUTH";


//just a type name
export const LOGOUT = `${NAME}/LOGOUT`;
export const LOGOUT_SUCESS = `${NAME}/LOGOUT_SUCESS`;
export const LOGOUT_FAIL = `${NAME}/LOGOUT_FAIL`;

export const getLogoutData = (store) => store[NAME].logout;


//create action function, step 3
export const logout = (data) => ({
    type: LOGOUT,
    data: data,
})

export const logoutSuccess = (data) => ({
    type: LOGOUT_SUCESS,
    data: data,
})

export const logoutFail = (error) => ({
    type: LOGOUT_FAIL,
    error: error,
    data: {},
})