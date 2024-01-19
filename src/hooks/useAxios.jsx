import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { tokenData } = useSelector((state) => state.auth);

  const baseURL = process.env.REACT_APP_BASE_URL;

  const axiosPublic = axios.create({
    baseURL,
    timeout: 5000,
  });

  const axiosToken = axios.create({
    baseURL,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${tokenData?.accessToken}`,
    },
  });

  return { axiosPublic, axiosToken };
};

export default useAxios;
