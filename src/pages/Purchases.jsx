import { Typography } from "@mui/material";
import PurchaseDataGrid from "../components/dataGrid/PurchaseDataGrid";

const Purchases = () => {
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
