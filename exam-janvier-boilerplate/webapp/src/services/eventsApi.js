import axios from "axios";
const baseUrl = "http://localhost:3001/api/events";

const retrieveAl = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newVolume) => {
  const request = axios.post(baseUrl, newVolume);
  return request.then((response) => response.data);
};

const remove = (resourceId) => {
  const request = axios.delete(`${baseUrl}/${resourceId}`);
  return request.then((response) => response.data);
};

export { retrieveAl, create, remove };
