import { Typography } from "@mui/material";
import SaleDataGrid from "../components/dataGrid/SaleDataGrid";
import useStock from "../hooks/useStock";
import { useEffect } from "react";

const Sales = () => {
  const { readStock } = useStock();

  useEffect(() => {
    const readStockData = async () => {
      await readStock("sales");
    };
    readStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h4" component="h2" className="textShadow">
        SALES
      </Typography>
      <SaleDataGrid />
    </>
  );
};

export default Sales;
