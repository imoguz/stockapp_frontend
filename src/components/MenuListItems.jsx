import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { menuItemsData } from "../helpers/menuItemData";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { drowerColor } from "../helpers/drawerConfig";

const MenuListItems = ({ open }) => {
  const { darkmode } = useContext(ThemeContext);

  const navigate = useNavigate();
  return (
    <>
      <List>
        {menuItemsData.mainMenu.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(item.path)}
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: darkmode
                  ? drowerColor.dark.hover
                  : drowerColor.light.hover,
              },
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: darkmode
                    ? drowerColor.dark.text
                    : drowerColor.light.text,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );
};

export default MenuListItems;
