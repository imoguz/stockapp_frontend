import { Typography } from "@mui/material";
import PurchaseDataGrid from "../components/dataGrid/PurchaseDataGrid";
import useStock from "../hooks/useStock";
import { useEffect } from "react";

const Purchases = () => {
  const { readStock } = useStock();

  useEffect(() => {
    const readStockData = async () => {
      await readStock("purchases");
    };
    readStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h4" component="h2" className="textShadow">
        PURCHASES
      </Typography>
      <PurchaseDataGrid />
    </>
  );
};

export default Purchases;
