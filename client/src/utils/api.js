import axios from "axios";

const LOCAL_ENDPOINT = "http://localhost:8080/";
const LIVE_ENDPOINT = "https://ideas-to-market.imp.fu-berlin.de/";

const apiEndpoint = axios.create({
  baseURL: LOCAL_ENDPOINT
  /* other custom settings */
});

export default apiEndpoint;
