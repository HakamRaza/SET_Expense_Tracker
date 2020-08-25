import axios from "axios";

export const configureInterceptor = () => {};
const baseToken = "716cdcf6-84d3-4aa0-8f3c-8c81f24621db";

export const getHeader = () => {
  return {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    Accept:"application/JSON",
  };
};

const getFullUrl = endpoint => {
  // where you put end point
  // return "localhost:8000/" + endpoint;
  return "https://enigmatic-falls-21596.herokuapp.com/" + endpoint;
};


const fetchApi = (method, endpoint, params, headers) =>
  axios({
    method,
    headers: headers || getHeader(),
    url: getFullUrl(endpoint),
    data: params
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));

export default fetchApi;
