import fetchApi from "./helper";

export const login = data => {
  return fetchApi("post", "api/auth/login", data);
};

export const register = data => {
  return fetchApi("post", "api/auth/register", data);
};