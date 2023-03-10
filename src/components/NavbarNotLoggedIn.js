import React, { useState } from "react";
import { Link } from "react-router-dom";

import { appTheme } from "../themes/appTheme";
import SearchIcon from "@mui/icons-material/Search";

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

export const NavbarNotLoggedIn = () => {
  const [isOpened, setIsOpened] = useState(false);
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
              <Typography>
                <Link to="/login" sx={{ color: "white" }}>
                  Prihlásiť
                </Link>
              </Typography>
              <Typography>
                <Link to="/register" sx={{ color: "white" }}>
                  Registrovať
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Drawer
          anchor="left"
          open={isOpened}
          onClose={() => setIsOpened(false)}
        >
          <Box role="presentation" textAlign="center">
            <h1>ahoj</h1>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
