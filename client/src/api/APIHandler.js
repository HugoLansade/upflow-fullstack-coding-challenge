import axios from "axios";

const APIHandler = (() => {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
})();

export default APIHandler;
