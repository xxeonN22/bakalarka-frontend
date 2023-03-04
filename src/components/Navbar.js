import { useState } from "react";
import { appTheme } from "../themes/appTheme";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  Toolbar,
  AppBar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DraftsIcon from "@mui/icons-material/Drafts";
import UserIcon from "../icons/UserIcon";

const navbarStyle = {
  display: "none",
  width: "100%",
  [appTheme.breakpoints.down("md")]: {
    display: "initial",
  },
};

export const Navbar = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <AppBar position="fixed">
      <Toolbar sx={navbarStyle}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            height: "70px",
          }}
        >
          <IconButton sx={{ color: "white" }} onClick={() => setIsOpened(true)}>
            <MenuIcon></MenuIcon>
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <LogoutIcon></LogoutIcon>
          </IconButton>
        </Box>
        <Drawer
          anchor="left"
          open={isOpened}
          onClose={() => setIsOpened(false)}
        >
          <Box role="presentation" textAlign="center">
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                paddingBlock: "2rem",
                paddingInline: "1rem",
                gap: "1rem",
              }}
            >
              <ListItem
                disablePadding
                sx={{ borderBottom: "1px solid grey" }}
                onClick={() => setIsOpened(false)}
              >
                <Link to="profile">
                  <ListItemButton>
                    <ListItemIcon>
                      <UserIcon width={24} height={24} fill="black" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ borderBottom: "1px solid grey" }}
                onClick={() => setIsOpened(false)}
              >
                <Link to="tournaments">
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tournaments" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ borderBottom: "1px solid grey" }}
                onClick={() => setIsOpened(false)}
              >
                <Link to="players">
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Hráči" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ borderBottom: "1px solid grey" }}
                onClick={() => setIsOpened(false)}
              >
                <Link to="matches">
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Zápasy" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding onClick={() => setIsOpened(false)}>
                <Link to="table">
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tabuľka" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding sx={{ marginTop: "auto" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Zmeniť tému" />
                  <Switch sx={{ marginLeft: "2rem" }} edge="end" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
