import axios from "axios";
const instance = axios.create({
  baseURL: "https://sage-server-rouge.vercel.app",
});
const useAxios = () => {
  return instance;
};

export default useAxios;