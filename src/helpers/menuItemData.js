import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StoreIcon from "@mui/icons-material/Store";
import SellIcon from "@mui/icons-material/Sell";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CategoryIcon from "@mui/icons-material/Category";

export const menuItemsData = {
  mainMenu: [
    { title: "Dashboards", icon: <DashboardIcon />, path: "/stock" },
    {
      title: "Purchases",
      icon: <ShoppingCartIcon />,
      path: "/stock/purchases",
    },
    { title: "Sales", icon: <MonetizationOnIcon />, path: "/stock/sales" },
    { title: "Firms", icon: <StoreIcon />, path: "/stock/firms" },
    { title: "Brands", icon: <SellIcon />, path: "/stock/brands" },
    { title: "Products", icon: <QrCodeIcon />, path: "/stock/products" },
    { title: "Category", icon: <CategoryIcon />, path: "/stock/categories" },
  ],
  subMenu: [],
};
