import API from "./Config";

const Service = {
  post: (params, data, token) =>
    new Promise((resolve, reject) => {
      API.post(params, data, { headers: { Authorization: "Bearer " + token } })
        .then((response) => response.data)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }),

  put: (params, data, token) =>
    new Promise((resolve, reject) => {
      API.post(params, data, { headers: { Authorization: "Bearer " + token } })
        .then((response) => response.data)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }),

  delete: (params, token) =>
    new Promise((resolve, reject) => {
      API.delete(params, { headers: { Authorization: "Bearer " + token } })
        .then((response) => response.data)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }),

  get: (params, token) =>
    new Promise((resolve, reject) => {
      API.get(params, { headers: { Authorization: "Bearer " + token } })
        .then((response) => response.data)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }),
};

export default Service;
