export const NAME = "STATS";

export const GET_PIE = `${NAME}/GET_PIE`;
export const GET_PIE_SUCCESS = `${NAME}/GET_PIE_SUCCESS`;
export const GET_PIE_FAIL = `${NAME}/GET_PIE_FAIL`;

export const getPieData = (store) => store[NAME].get_pie;

export const get_pie = (data) => ({
  type: GET_PIE,
  data,
});

export const get_pieSuccess = (data) => ({
  type: GET_PIE_SUCCESS,
  data,
});

export const get_pieFail = (error) => ({
  type: GET_PIE_FAIL,
  error,
});