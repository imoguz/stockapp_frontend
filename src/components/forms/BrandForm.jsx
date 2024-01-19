import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useStock from "../../hooks/useStock";
import { Formik, Form } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import { VisuallyHiddenInput } from "../../helpers/styleConfig";
import uploadToCloudinary from "../../helpers/uploadToCloudinary";
import { useEffect } from "react";

const BrandForm = ({ setOpen, initialForm, setInitialForm, stockName }) => {
  const { createStock, updateStock } = useStock();

  useEffect(() => {
    return () => {
      setInitialForm({ name: "", image: "" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={{ name: initialForm?.name, image: "" }}
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
            margin="normal"
            fullWidth
            required
            autoFocus
            id="name"
            label="Brand Name"
            name="name"
            value={values?.name}
            onChange={handleChange}
          />

          <Button
            component="label"
            variant="contained"
            sx={{ mt: 1 }}
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
          {values?.image && (
            <Typography noWrap variant={"span"} fontSize={14}>
              {" "}
              ../{values.image.name?.slice(0, 20)}
              {values.image.name?.length > 20 && "..."}
            </Typography>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {initialForm?._id ? "UPDATE BRAND" : "ADD BRAND"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BrandForm;
