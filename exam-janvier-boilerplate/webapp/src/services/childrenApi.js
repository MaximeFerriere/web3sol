import axios from "axios";
const baseUrl = "http://localhost:3001/api/children";

const retrieveAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export { retrieveAll };
