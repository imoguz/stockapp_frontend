import useStock from "../../hooks/useStock";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { TextField, Box, Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function PurchaseForm() {
  const { firms, brands, products } = useSelector((store) => store.stock);

  const { createStock } = useStock();
  return (
    <Formik
      initialValues={{
        firmId: "",
        brandId: "",
        productId: "",
        quantity: "",
        price: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        createStock(values, "purchases");
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
              <InputLabel id="firm">Firm</InputLabel>
              <Select
                required
                labelId="firm"
                label="firms"
                id="firms"
                name="firmId"
                value={values.firmId}
                onChange={handleChange}
              >
                {firms.map((item) => (
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
              ADD PURCHASE
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
