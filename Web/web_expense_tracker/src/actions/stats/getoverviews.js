export const NAME = "STATS";

export const GET_OVERVIEW = `${NAME}/GET_OVERVIEW`;
export const GET_OVERVIEW_SUCCESS = `${NAME}/GET_OVERVIEW_SUCCESS`;
export const GET_OVERVIEW_FAIL = `${NAME}/GET_OVERVIEW_FAIL`;

export const getOverviewData = (store) => store[NAME].get_overview;

export const get_overview = (data) => ({
  type: GET_OVERVIEW,
  data,
});

export const get_overviewSuccess = (data) => ({
  type: GET_OVERVIEW_SUCCESS,
  data,
});

export const get_overviewFail = (error) => ({
  type: GET_OVERVIEW_FAIL,
  error,
});