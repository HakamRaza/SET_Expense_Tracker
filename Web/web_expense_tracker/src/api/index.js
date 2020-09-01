import fetchApi from "./helper";

//auth

export const login = data => {
  return fetchApi("post", "api/auth/login", data);
};

export const register = data => {
  return fetchApi("post", "api/auth/register", data);
};

export const logout = (header) => {
  return fetchApi("get", "api/auth/logout", null, header);
};

//transaction

export const new_transaction = (data, header) => {
  return fetchApi("post", "api/new_transaction", data, header);
};

export const get_transaction = (data, header) => {
  return fetchApi("post", "api/get_transactions", data, header);
};

export const update_transaction = (data, header) => {
  return fetchApi("post", "api/update_transaction", data, header);
};

export const delete_transaction = (data, header) => {
  return fetchApi("post", "api/delete_transaction", data, header);
};

//category
export const new_category = (data, headers) => {
  return fetchApi("post", "api/new_category", data, headers);
};
export const update_category = (data, headers) => {
  return fetchApi("post", "api/update_category", data, headers);
};
export const delete_category = (data, headers) => {
  return fetchApi("post", "api/delete_category", data, headers);
};

//same as in saga api call
export const get_categories = (header) => {
return fetchApi("get", "api/get_categories", null, header);
};

//stats
export const get_bars = (data, headers) => {
  return fetchApi("post", "api/get_bars", data, headers);
};
export const get_pie = (data, headers) => {
  return fetchApi("post", "api/get_pie", data, headers);
};
export const get_overview = (data, headers) => {
  return fetchApi("post", "api/get_overview", data, headers);
};