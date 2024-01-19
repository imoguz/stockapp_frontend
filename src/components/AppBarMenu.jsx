import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, Toolbar, Tooltip, IconButton } from "@mui/material";
import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import noimage from "../assets/noimage.jpg";
import { useNavigate } from "react-router-dom";

const AppBarMenu = ({ open, handleDrawerOpen, AppBar }) => {
  const { darkmode, setDarkmode } = useContext(ThemeContext);
  const { logout } = useAuth();
  const settings = ["Account", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const avatar = user?.image
    ? user?.uid
      ? user?.image
      : `http://res.cloudinary.com/yami0510/stockapp/image/${user?.image}`
    : noimage;

  const handleClick = (setting) => {
    setting === "Account" && navigate("account");
    setting === "Logout" && logout();
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{ mx: 3, display: "flex", justifyContent: "space-between" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            className="logoShadow"
          >
            Stock Management App
          </Typography>
          <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Box
              sx={{
                border: 2,
                borderRadius: 2,
                borderColor: "white",
                p: 0.5,
                display: "flex",
                alignItems: "center",
              }}
            >
              {darkmode && (
                <Tooltip title={"Open Light Mode"}>
                  <DarkModeIcon
                    fontSize="medium"
                    onClick={() => setDarkmode(!darkmode)}
                    sx={{
                      opacity: 0.8,
                      "&:hover": {
                        opacity: 1,
                        cursor: "pointer",
                      },
                    }}
                  />
                </Tooltip>
              )}
              {!darkmode && (
                <Tooltip title={"Open Light Mode"}>
                  <LightModeIcon
                    fontSize="medium"
                    onClick={() => setDarkmode(!darkmode)}
                    sx={{
                      opacity: 0.8,
                      "&:hover": {
                        opacity: 1,
                        cursor: "pointer",
                      },
                    }}
                  />
                </Tooltip>
              )}
            </Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user?.image ? (
                  <Avatar alt="Profile Photo" src={avatar} />
                ) : (
                  <Avatar sx={{ bgcolor: "orange" }}>
                    {user?.username[0]}
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => handleClick(setting)}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarMenu;
