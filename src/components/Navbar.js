import { useEffect, useState } from "react";
import { appTheme } from "../themes/appTheme";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
const navbarStyle = {
  display: "none",
  width: "100%",
  [appTheme.breakpoints.down("md")]: {
    display: "initial",
  },
};

export const Navbar = ({ screen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTabletSize) {
      handleClose();
    }
  });

  const handleLogOut = async () => {
    const response = await fetch(`http://localhost:3000/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (response.status === 200) {
      navigate("/login");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={navbarStyle}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            height: "70px",
          }}
        >
          <IconButton
            sx={{ color: "white", padding: "0px" }}
            id="user-icon"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <ManageAccountsOutlinedIcon></ManageAccountsOutlinedIcon>
          </IconButton>
        </Box>
        <Menu
          id="navbar-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <SettingsOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Nastavenia profilu
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <DarkModeOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Prepnúť vzhľad
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogOut();
            }}
          >
            <LogoutOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Odhlásiť sa
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
