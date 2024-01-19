import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toastifyInfo,
  toastifySuccess,
  toastifyError,
} from "../helpers/toastify";

import {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} from "../features/authSlice";

const useAuth = () => {
  const { axiosPublic } = useAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Login
  const login = async (formdata) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post(`/auth/login`, formdata);
      dispatch(loginSuccess(data));
      toastifySuccess("You have successfully logged in.");
      navigate("stock");
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(
        error.response?.data ||
          "Failed to access the server. Please try again later."
      );
    }
  };

  //refresh
  const refresh = async (refresh) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post(`/auth/refresh`, { refresh });
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      logout("refresh error");
    }
  };

  //Register
  const register = async (formData) => {
    dispatch(fetchStart());
    try {
      await axiosPublic.post("/users", formData);
      dispatch(registerSuccess());
      toastifyInfo(
        "Your registration was successful. A verification code has been sent to your email."
      );
      navigate("/");
    } catch (error) {
      toastifyError(error.response.data?.message);
      dispatch(fetchFail());
    }
  };

  // Logout
  const logout = async (message) => {
    dispatch(fetchStart());
    try {
      dispatch(logoutSuccess());
      message || toastifySuccess("You have successfully logged in.");
    } catch (error) {
      dispatch(fetchFail());
      toastifyError("Logout failed, please try again.");
    }
  };
  return { login, register, logout, refresh };
};

export default useAuth;
