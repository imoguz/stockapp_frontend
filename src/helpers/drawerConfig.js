import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export const drowerColor = {
  dark: {
    topdrower: "#212121",
    leftdrower: "#323232",
    text: "#c0c0c0",
    hover: "#323245",
  },
  light: {
    topdrower: "#461959",
    leftdrower: "#7A316F",
    text: "#ffffff",
    hover: "#461959",
  },
};

const drawerWidth = 220;

const openedMixin = (theme, darkmode) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: darkmode
    ? drowerColor.dark.leftdrower
    : drowerColor.light.leftdrower,
  color: darkmode ? drowerColor.dark.text : drowerColor.light.text,
});

const closedMixin = (theme, darkmode) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: darkmode
    ? drowerColor.dark.leftdrower
    : drowerColor.light.leftdrower, //kapanınca sol menü rengi
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const { darkmode } = useContext(ThemeContext);

  return {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: darkmode
      ? drowerColor.dark.topdrower
      : drowerColor.light.topdrower, //kapanınca üst çubuk rengi
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      backgroundColor: darkmode
        ? drowerColor.dark.topdrower
        : drowerColor.light.topdrower,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const { darkmode } = useContext(ThemeContext);

  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme, darkmode),
      "& .MuiDrawer-paper": openedMixin(theme, darkmode),
    }),
    ...(!open && {
      ...closedMixin(theme, darkmode),
      "& .MuiDrawer-paper": closedMixin(theme, darkmode),
    }),
  };
});
