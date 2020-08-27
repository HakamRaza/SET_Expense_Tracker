export const NAME = "STATS";

export const GET_PIE = `${NAME}/GET_PIE`;
export const GET_PIE_SUCCESS = `${NAME}/GET_PIE_SUCCESS`;
export const GET_PIE_FAIL = `${NAME}/GET_PIE_FAIL`;

export const getGetPieData = (store) => store[NAME].getPie;

export const getPie = (data) => ({
  type: GET_PIE,
  data,
});

export const getPieSuccess = (data) => ({
  type: GET_PIE_SUCCESS,
  data,
});

export const getPieFail = (error) => ({
  type: GET_PIE_FAIL,
  error,
});