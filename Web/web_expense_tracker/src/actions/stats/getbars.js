export const NAME = "STATS";

export const GET_BARS = `${NAME}/GET_BARS`;
export const GET_BARS_SUCCESS = `${NAME}/GET_BARS_SUCCESS`;
export const GET_BARS_FAIL = `${NAME}/GET_BARS_FAIL`;

export const getGetBarsData = (store) => store[NAME].getBars;

export const getBars = (data) => ({
  type: GET_BARS,
  data,
});

export const getBarsSuccess = (data) => ({
  type: GET_BARS_SUCCESS,
  data,
});

export const getBarsFail = (error) => ({
  type: GET_BARS_FAIL,
  error,
});