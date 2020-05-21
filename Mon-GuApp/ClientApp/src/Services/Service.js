import API from "./Config";

const Service = {

  post: (params, data) =>
    new Promise((resolve, reject) => {
      API.post(params, data)
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(err => reject(err));
    }),

  get: (params) =>
    new Promise((resolve, reject) => {
      API.get(params)
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
};

export default Service;
