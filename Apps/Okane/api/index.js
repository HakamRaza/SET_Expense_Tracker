import fetchApi from "./helper";

//auth
  export const login = data => {
    return fetchApi("post", "api/auth/login", data);
  };
  //data is formData pass from saga. register.js
  export const register = (data) => {
    return fetchApi("post", "api/auth/register", data)
  };

//transaction
  export const newTransaction = (data, headers) => {
    return fetchApi("post", "api/new_transaction", data, headers);
  };
  export const updateTransaction = (data, headers) => {
    return fetchApi("post", "api/update_transaction", data, headers);
  };
  export const deleteTransaction = (data, headers) => {
    return fetchApi("post", "api/delete_transaction", data, headers);
  };
  export const getTransaction = (data, headers) => {
    return fetchApi("get", "api/get_transaction", data, headers);
  };

//category
  export const newCategory = (data, headers) => {
    return fetchApi("post", "api/new_category", data, headers);
  };
  export const updateCategory = (data, headers) => {
    return fetchApi("post", "api/update_category", data, headers);
  };
  export const deleteCategory = (data, headers) => {
    return fetchApi("post", "api/delete_category", data, headers);
  };
  export const getCategoryList = (headers) => {
    return fetchApi("get", "api/get_categories", null, headers);
  };

//stats
  export const getBars = (data, headers) => {
    return fetchApi("get", "api/get_bars", data, headers);
  };
  export const getPie = (data, headers) => {
    return fetchApi("post", "api/get_pie", data, headers);
  };
  export const getOverview = (data, headers) => {
    return fetchApi("get", "api/get_overview", data, headers);
  };

