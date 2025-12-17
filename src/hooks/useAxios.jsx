import axios from "axios";
const instance = axios.create({
  baseURL: "sage-server-rouge.vercel.app",
});
const useAxios = () => {
  return instance;
};

export default useAxios;