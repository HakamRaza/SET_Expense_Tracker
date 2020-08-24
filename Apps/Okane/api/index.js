import fetchApi from "./helper";

export const login = data => {
  return fetchApi("post", "api/auth/login", data);
};

//register
//data is formData pass from saga. register.js
export const register = (data) => {
  return fetchApi("post", "api/auth/register", data)
};

export const createToDo = (data, headers) => {
  return fetchApi("post", "api/toDo/create", data, headers);
};

export const updateStatus = (data, headers) => {
  return fetchApi("post", "api/toDo/updateStatus", data, headers);
};

export const deleteTask = (data, headers) => {
  return fetchApi("post", "api/toDo/delete", data, headers);
};

export const getAll = (headers) => {
  return fetchApi("get", "api/toDo/record", null, headers);
};

export const getAllPending = (headers) => {
  return fetchApi("get", "api/toDo/pending", null, headers);
};

export const getAllCompleted = (headers) => {
  return fetchApi("get", "api/toDo/completed", null, headers);
};

// export const createToDo = (data, header) => {
//   return fetchApi("post", "api/toDo/create", data, { headers: {"Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODA4M1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU5NTU4MTkxNSwiZXhwIjoxNTk1NTg1NTE1LCJuYmYiOjE1OTU1ODE5MTUsImp0aSI6IkR1ZDdGTFp3eENKWDAzUnAiLCJzdWIiOjYsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.d2MSLpwg3iL628AL9G0pO29ddY_GVn2iKEeae8rbSjQ"} })
// };