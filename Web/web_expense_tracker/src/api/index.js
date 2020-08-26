import fetchApi from "./helper";

export const login = data => {
  return fetchApi("post", "api/auth/login", data);
};

export const register = data => {
  return fetchApi("post", "api/auth/register", data);
};

export const logout = (header) => {
  return fetchApi("get", "api/auth/logout", null, header);
};
              //same as in saga api call
export const get_categories = (header) => {
  return fetchApi("get", "api/get_categories", null, header);
};

export const new_transaction = (data, header) => {
  return fetchApi("post", "api/new_transaction", data, header);
};

export const get_transaction = (data, header) => {
  return fetchApi("post", "api/get_transactions", data, header);
};

export const update_transaction = (data, header) => {
  return fetchApi("post", "api/update_transaction", data, header);
};