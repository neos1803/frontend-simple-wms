import axios from "axios";

// const port = 4190;
const base = "https://simple-wms.herokuapp.com"

const instance = axios.create({
  baseURL: `${base}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log({ request: config });
    // const newH = config.headers;
    // const token = "";
    // newH.authentication = `Beader ${token}`;
    // config.headers = newH;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log({ response });
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
