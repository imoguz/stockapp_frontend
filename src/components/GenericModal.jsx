import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../helpers/styleConfig";
import PurchaseForm from "./forms/PurchaseForm";
import SaleForm from "./forms/SaleForm";
import FirmForm from "./forms/FirmForm";
import BrandForm from "./forms/BrandForm";
import ProductForm from "./forms/ProductForm";

const GenericModal = ({
  open,
  setOpen,
  initialForm,
  setInitialForm,
  stockName,
}) => {
  let updateStock;
  switch (stockName) {
    case "purchases":
      updateStock = (
        <PurchaseForm
          {...{ setOpen, initialForm, setInitialForm, stockName }}
        />
      );
      break;
    case "sales":
      updateStock = (
        <SaleForm {...{ setOpen, initialForm, setInitialForm, stockName }} />
      );
      break;

    case "firms":
      updateStock = (
        <FirmForm {...{ setOpen, initialForm, setInitialForm, stockName }} />
      );
      break;

    case "brands":
      updateStock = (
        <BrandForm {...{ setOpen, initialForm, setInitialForm, stockName }} />
      );
      break;

    case "products":
      updateStock = (
        <ProductForm {...{ setOpen, initialForm, setInitialForm, stockName }} />
      );
      break;
    default:
      setOpen(false);
      break;
  }
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography
          id="modal-modal-description"
          variant="h5"
          textAlign={"center"}
          className="modalHeaderStyle"
        >
          {initialForm?._id ? "UPDATE " : "ADD "}
          {stockName.slice(0, stockName.length - 1).toUpperCase()}
        </Typography>
        {updateStock}
      </Box>
    </Modal>
  );
};

export default GenericModal;
