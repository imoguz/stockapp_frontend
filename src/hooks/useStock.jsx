import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { toastifySuccess, toastifyError } from "../helpers/toastify";
import { fetchStart, fetchSuccess, fetchFail } from "../features/stockSlice";
import { useSelector } from "react-redux";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useStock = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const { tokenData } = useSelector((state) => state.auth);
  const { refresh } = useAuth();

  useEffect(() => {
    if (new Date(tokenData?.accessExpired) < new Date()) {
      refresh(tokenData?.refreshToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create
  const createStock = async (formData, stockName) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.post(`/${stockName}`, formData);
      readStock(stockName);
      toastifySuccess(
        `You have successfully added ${stockName.slice(
          0,
          stockName.length - 1
        )}`
      );
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(
        error.response?.status === 400
          ? "Validation error: Require fields are missing."
          : `${stockName} can not be added`
      );
    }
  };

  // Read
  const readStock = async (stockName) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/${stockName}`);
      dispatch(fetchSuccess({ data, stockName }));
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(`${stockName} can not be fetched`);
    }
  };

  // Update
  const updateStock = async (formData, stockName, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.put(`/${stockName}/${id}`, formData);
      readStock(stockName);
      toastifySuccess(
        `You have successfully updated ${stockName.slice(
          0,
          stockName.length - 1
        )}`
      );
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(
        error.response?.status === 400
          ? "Validation error: Require fields are missing."
          : `${stockName} can not be updated`
      );
    }
  };

  // Delete
  const deleteStock = async (id, stockName) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${stockName}/${id}`);
      readStock(stockName);
      toastifySuccess(
        `You have successfully deleted ${stockName.slice(
          0,
          stockName.length - 1
        )}`
      );
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(
        `${stockName?.slice(0, stockName.length - 1)} can not be deleted`
      );
    }
  };

  return { createStock, readStock, deleteStock, updateStock };
};

export default useStock;
