import { useEffect, useState } from "react";
import { appTheme } from "../themes/appTheme";
import { api } from "../axios/axios";
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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { DialogWindow } from "../components/DialogWindow";
import { EditUserProfile } from "../components/EditUserProfile";
import CloseIcon from "@mui/icons-material/Close";

const navbarStyle = {
  display: "none",
  width: "100%",
  [appTheme.breakpoints.down("md")]: {
    display: "initial",
  },
};

export const Navbar = ({ screen, setResponseMessage }) => {
  const [dialogState, setDialogState] = useState(false);
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
    try {
      const response = await api.post(`/logout`);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
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
            <ManageAccountsOutlinedIcon
              sx={{ color: "#FCCE36" }}
            ></ManageAccountsOutlinedIcon>
          </IconButton>
        </Box>
        <Menu
          id="navbar-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleDialogOpen()}>
            <SettingsOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            Nastavenia profilu
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
        <DialogWindow
          handleClose={handleClose}
          open={dialogState}
          handleCloseModal={handleDialogClose}
        >
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => {
              handleDialogClose();
              handleClose();
            }}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <EditUserProfile
            setResponseMessage={setResponseMessage}
            handleDialogClose={handleDialogClose}
            handleClose={handleClose}
          ></EditUserProfile>
        </DialogWindow>
      </Toolbar>
    </AppBar>
  );
};
