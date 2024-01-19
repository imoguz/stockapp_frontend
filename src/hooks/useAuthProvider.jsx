import { auth } from "../Auth/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { toastifySuccess, toastifyError } from "../helpers/toastify";
import { useNavigate } from "react-router-dom";
import {
  fetchStart,
  loginSuccess,
  registerSuccess,
  fetchFail,
} from "../features/authSlice";

const useAuthProvider = () => {
  const { axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const GoogleProvider = async (act, stockName) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        if (act === "register") {
          let userData = {
            firstname: result._tokenResponse.firstName,
            lastname: result._tokenResponse.lastName,
            email: result.user.email,
            uid: result.user.providerData[0].uid,
            image: result.user.photoURL,
          };
          dispatch(fetchStart());
          try {
            const { data } = await axiosPublic.post(`/${stockName}`, userData);
            dispatch(registerSuccess({ data, stockName }));
            console.log(data);
          } catch (error) {
            dispatch(fetchFail());
            toastifyError(
              "Register failed, if you have already registered, please log in. "
            );
            return;
          }
        }
        dispatch(fetchStart());
        let userData = {
          email: result.user.email,
          uid: result.user.providerData[0].uid,
        };
        try {
          const { data } = await axiosPublic.post(
            `/googleUsers/login`,
            userData
          );
          dispatch(loginSuccess(data));
          toastifySuccess(
            act === "register"
              ? "You have successfully sign up and logged in."
              : "You have successfully logged in."
          );
          navigate("/stock");
        } catch (error) {
          dispatch(fetchFail());
          toastifyError(
            error.response?.data ||
              "Failed to access the server. Please try again later."
          );
          return;
        }
      })
      .catch((error) => {
        toastifyError("Login failed, please try again later.");
      });
  };

  return { GoogleProvider };
};

export default useAuthProvider;
