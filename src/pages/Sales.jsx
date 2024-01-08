import { Typography } from "@mui/material";
import SaleDataGrid from "../components/dataGrid/SaleDataGrid";

const Sales = () => {
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
