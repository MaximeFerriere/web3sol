import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3001/places",
});

const retrieve = () => {
  return client.get("/").then((r) => r.data);
};

const create = (newObject) => {
  return client.post("/", newObject);
};

const deleteO = (id) => {
  return client.delete(`/${id}`);
};

export { retrieve, create, deleteO };
