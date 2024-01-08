import { useSelector } from "react-redux";
import KpiCards from "../components/KpiCards";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { Grid, Typography } from "@mui/material";
import { cyan, green, pink } from "@mui/material/colors";
import ReCharts from "../components/ReCharts";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Home = () => {
  const { darkmode } = useContext(ThemeContext);
  const { purchases, sales } = useSelector((store) => store.stock);
  const totalSale = sales.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalPurchase = purchases.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  const kpiData = [
    {
      name: "Sales",
      total: totalSale,
      icon: <PointOfSaleIcon />,
      color: pink[500],
    },
    {
      name: "Purchases",
      total: totalPurchase,
      icon: <ShoppingCartIcon />,
      color: cyan[500],
    },
    {
      name: "Profit",
      total: totalPurchase - totalSale,
      icon: <MonetizationOnIcon />,
      color: green[500],
    },
  ];
  return (
    <>
      <Typography variant="h4" component="h2" className="textShadow">
        Dashboard
      </Typography>
      <Grid container mt={1} spacing={5} justifyContent={"center"}>
        {kpiData.map((item, index) => (
          <Grid item key={index}>
            <KpiCards key={index} item={item} />
          </Grid>
        ))}
      </Grid>
      <Grid container mt={3} mb={4} spacing={7} justifyContent={"center"}>
        <Grid item sx={{ backgroundColor: darkmode ? "#353535" : "white" }}>
          <ReCharts stock={purchases} stockName="purchase" />
        </Grid>
        <Grid item sx={{ backgroundColor: darkmode ? "#353535" : "white" }}>
          <ReCharts stock={sales} stockName="sale" />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
