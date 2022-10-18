import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

instance.interceptors.response.use((response) => {
  // eslint-disable-next-line no-unused-vars
  const { data } = response;
  return response.data;
});

export default instance;
