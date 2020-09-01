export const NAME = "STATS";

export const GET_BARS = `${NAME}/GET_BARS`;
export const GET_BARS_SUCCESS = `${NAME}/GET_BARS_SUCCESS`;
export const GET_BARS_FAIL = `${NAME}/GET_BARS_FAIL`;

export const getBarsData = (store) => store[NAME].get_bars;

export const get_bars = (data) => ({
  type: GET_BARS,
  data,
});

export const get_barsSuccess = (data) => ({
  type: GET_BARS_SUCCESS,
  data,
});

export const get_barsFail = (error) => ({
  type: GET_BARS_FAIL,
  error,
});