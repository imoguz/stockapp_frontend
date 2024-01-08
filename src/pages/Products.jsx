import { Typography } from "@mui/material";
import ProductDataGrid from "../components/dataGrid/ProductDataGrid";

const Products = () => {
  const stockName = "products";

  return (
    <>
      <Typography variant="h4" component="h2" className="textShadow">
        PRODUCT
      </Typography>
      <ProductDataGrid {...{ stockName }} />
    </>
  );
};

export default Products;
