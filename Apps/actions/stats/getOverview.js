export const NAME = "STATS";

export const GET_OVERVIEW = `${NAME}/GET_OVERVIEW`;
export const GET_OVERVIEW_SUCCESS = `${NAME}/GET_OVERVIEW_SUCCESS`;
export const GET_OVERVIEW_FAIL = `${NAME}/GET_OVERVIEW_FAIL`;

export const getGetOverviewData = (store) => store[NAME].getOverview;

export const getOverview = (data) => ({
  type: GET_OVERVIEW,
  data,
});

export const getOverviewSuccess = (data) => ({
  type: GET_OVERVIEW_SUCCESS,
  data,
});

export const getOverviewFail = (error) => ({
  type: GET_OVERVIEW_FAIL,
  error,
});
