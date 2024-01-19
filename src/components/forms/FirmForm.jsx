import useStock from "../../hooks/useStock";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Formik, Form } from "formik";
import { TextField, Typography, Button } from "@mui/material";
import { VisuallyHiddenInput } from "../../helpers/styleConfig";
import uploadToCloudinary from "../../helpers/uploadToCloudinary";
import { useEffect } from "react";

export default function FirmForm({
  setOpen,
  initialForm,
  setInitialForm,
  stockName,
}) {
  const { createStock, updateStock } = useStock();
  useEffect(() => {
    return () => {
      setInitialForm({ name: "", address: "", phone: "", image: "" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={{
        name: initialForm?.name,
        address: initialForm?.address,
        phone: initialForm?.phone,
        image: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        values?.image || delete values?.image;
        values.image =
          values?.image && (await uploadToCloudinary(values.image));
        initialForm?._id
          ? updateStock(values, stockName, initialForm?._id)
          : createStock(values, stockName);
        resetForm();
        setSubmitting(false);
        setOpen(false);
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            autoFocus
            id="name"
            label="Firm Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="address"
            label="Firm Address"
            name="address"
            value={values.address}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            type="tel"
            id="phone"
            label="Firm Phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
          <Button
            component="label"
            variant="contained"
            sx={{ my: 1 }}
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
            />
          </Button>
          {values.image && (
            <Typography variant="span" fontSize={14}>
              {" "}
              ../{values.image.name.slice(0, 20)}
              {values.image.name.length > 20 && "..."}
            </Typography>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
          >
            {initialForm?._id ? "UPDATE FIRM" : "ADD FIRM"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
