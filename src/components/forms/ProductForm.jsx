import useStock from "../../hooks/useStock";
import { Formik, Form } from "formik";
import { TextField, Box, Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProductForm() {
  const { readStock } = useStock();

  useEffect(() => {
    readStock("categories");
    readStock("brands");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { categories, brands } = useSelector((store) => store.stock);
  const { createStock } = useStock();

  return (
    <Formik
      initialValues={{
        categoryId: "",
        brandId: "",
        name: "",
        quantity: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        createStock(values, "products");
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                required
                labelId="category"
                label="category"
                id="category"
                name="categoryId"
                value={values.categoryId}
                onChange={handleChange}
              >
                {categories.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="brand">Brand</InputLabel>
              <Select
                required
                labelId="brand"
                label="Brand Name"
                id="brands"
                name="brandId"
                value={values.brandId}
                onChange={handleChange}
              >
                {brands.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              required
              id="name"
              label="Product Name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              type="Number"
              id="quantity"
              label="Quantity"
              name="quantity"
              value={values.quantity}
              onChange={handleChange}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              sx={{ mt: 1 }}
            >
              ADD PRODUCT
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
