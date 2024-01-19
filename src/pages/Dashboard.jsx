import { useTheme } from "@mui/material/styles";
import { Box, Divider, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuListItems from "../components/MenuListItems";
import { useEffect, useState } from "react";
import AppBarMenu from "../components/AppBarMenu";
import { AppBar, DrawerHeader, Drawer } from "../helpers/drawerConfig";
import { Outlet } from "react-router-dom";
import useStock from "../hooks/useStock";

export default function Dashboard() {
  const { readStock } = useStock();

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    const readStockData = async () => {
      await readStock("firms");
      await readStock("brands");
      await readStock("products");
      await readStock("categories");
      await readStock("purchases");
      await readStock("sales");
    };
    readStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarMenu
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        AppBar={AppBar}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuListItems open={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, px: 3, py: 1 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
