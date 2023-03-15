import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { appTheme } from "../themes/appTheme";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "../icons/LoginIcon";
import RegisterIcon from "../icons/RegisterIcon";

import {
  Toolbar,
  AppBar,
  Grid,
  Box,
  IconButton,
  Typography,
  InputBase,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const underlineEffect = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  paddingBottom: "0.5rem",
  color: "white",
  "&:hover": {
    color: "#4d80e8",
  },
  "&::before, &::after": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "1px",
    backgroundColor: "#4d80e8",
    transition: "width 0.5s ease",
    width: 0,
  },
  "&:hover::before, &:hover::after": {
    width: "100%",
  },
};

export const NavbarNotLoggedIn = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { pathname } = useLocation();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid
          container
          sx={{ display: "flex", height: "70px", alignItems: "center" }}
        >
          <Grid item sx={{ flex: 1 }}>
            <IconButton
              sx={{
                color: "white",
                paddingBlock: "0.5rem",
                [appTheme.breakpoints.up("md")]: {
                  display: "none",
                },
              }}
              onClick={() => setIsOpened(true)}
            >
              <MenuIcon></MenuIcon>
            </IconButton>
          </Grid>
          <Grid item sx={{ flex: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <InputBase
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  width: "60%",
                  [appTheme.breakpoints.down("lg")]: {
                    width: "70%",
                  },
                  [appTheme.breakpoints.down("md")]: {
                    width: "100%",
                  },
                  "& .MuiInputBase-input": {
                    paddingBlock: "0.5rem",
                  },
                  "& .MuiSvgIcon-root": {
                    marginInline: "0.5rem",
                  },
                }}
                placeholder="Vyhľadať turnaj"
                startAdornment={<SearchIcon></SearchIcon>}
              ></InputBase>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "2rem",
                [appTheme.breakpoints.down("md")]: {
                  display: "none",
                },
              }}
            >
              <Box sx={underlineEffect}>
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Prihlásiť
                </Link>
              </Box>
              <Box sx={underlineEffect}>
                <Link
                  to="/register"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Registrovať
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Drawer
          anchor="left"
          open={isOpened}
          onClose={() => setIsOpened(false)}
        >
          <Box
            sx={{
              backgroundColor: "#1f2736",
              width: "250px",
              paddingTop: "2rem",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                width: "100%",
                justifyContent: "center",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
              to="/login"
              className={"/login" === pathname ? "active" : ""}
            >
              <Box sx={underlineEffect}>
                <LoginIcon width={25} height={25} fill={"white"}></LoginIcon>
                <Typography
                  sx={{ marginLeft: "0.5rem" }}
                  variant="h2"
                  fontSize="1.15rem"
                  color="white"
                >
                  Prihlásiť sa
                </Typography>
              </Box>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                width: "100%",
                justifyContent: "center",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
              to="/register"
              className={"/register" === pathname ? "active" : ""}
            >
              <Box sx={underlineEffect}>
                <RegisterIcon
                  width={25}
                  height={25}
                  fill={"white"}
                ></RegisterIcon>
                <Typography
                  sx={{ marginLeft: "0.5rem" }}
                  variant="h2"
                  fontSize="1.15rem"
                  color="white"
                >
                  Registrovať sa
                </Typography>
              </Box>
            </Link>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
