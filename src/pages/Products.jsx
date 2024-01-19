import { Typography } from "@mui/material";
import ProductDataGrid from "../components/dataGrid/ProductDataGrid";
import useStock from "../hooks/useStock";
import { useEffect } from "react";

const Products = () => {
  const stockName = "products";

  const { readStock } = useStock();

  useEffect(() => {
    const readStockData = async () => {
      await readStock("products");
    };
    readStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
