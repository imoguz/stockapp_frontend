import { useEffect } from "react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { TextField, Box, Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useStock from "../../hooks/useStock";

export default function SaleForm() {
  const { readStock } = useStock();

  useEffect(() => {
    readStock("brands");
    readStock("products");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { brands, products } = useSelector((store) => store.stock);
  const { createStock } = useStock();

  return (
    <Formik
      initialValues={{
        brandId: "",
        productId: "",
        quantity: "",
        price: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        createStock(values, "sales");
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
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="brand">Brand</InputLabel>
              <Select
                required
                labelId="brand"
                label="brands"
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

            <FormControl fullWidth>
              <InputLabel id="product">Product</InputLabel>
              <Select
                required
                labelId="product"
                label="products"
                id="products"
                name="productId"
                value={values.productId}
                onChange={handleChange}
              >
                {products.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              required
              type="Number"
              id="price"
              label="Price"
              name="price"
              value={values.price}
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
              ADD SALE
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
