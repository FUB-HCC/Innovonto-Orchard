import axios from "axios";

const apiBase = process.env.REACT_APP_API;
const apiEndpoint = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_LIVE_ENDPOINT + apiBase
      : process.env.REACT_APP_LOCAL_ENDPOINT + apiBase
  /* other custom settings */
});

export default apiEndpoint;
