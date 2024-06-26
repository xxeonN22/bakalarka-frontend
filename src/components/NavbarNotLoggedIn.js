import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../axios/axios";
import { AutoCompleteSearch } from "./AutoCompleteSearch";
import { useNavigate } from "react-router-dom";

import { appTheme } from "../themes/appTheme";

import {
  Toolbar,
  AppBar,
  Grid,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const underlineEffect = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  paddingBottom: "0.5rem",
  color: appTheme.palette.sunglow.main,
  "&:hover": {
    color: appTheme.palette.sunglow.dark,
  },
  "&::before, &::after": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "1px",
    backgroundColor: appTheme.palette.sunglow.dark,
    transition: "width 0.5s ease",
    width: 0,
  },
  "&:hover::before, &:hover::after": {
    width: "100%",
  },
};

export const NavbarNotLoggedIn = ({ setResponseMessage }) => {
  const [searchText, setSearchText] = useState("");
  const [tournamentData, setTournamentData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/");
        setTournamentData(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    })();
  }, []);

  const filteredData = tournamentData.filter((data) =>
    data.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (!isTabletSize) {
      handleClose();
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchTournament = async (tournamentName) => {
    try {
      const response = await api.get(`/searchtournament/${tournamentName}`);
      navigate(`/searchtournament/${response.data}`);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid
          container
          sx={{ display: "flex", height: "70px", alignItems: "center" }}
        >
          <Grid item sx={{ flex: 1 }}></Grid>
          <Grid item sx={{ flex: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <AutoCompleteSearch
                id="search-tournament"
                placeholder="Vyhľadať turnaj"
                searchText={searchText}
                setSearchText={setSearchText}
                filteredData={filteredData}
                handleSearchTournament={handleSearchTournament}
                style={{
                  backgroundColor: "white",
                  color: appTheme.palette.primary.main,
                  borderRadius: "4px",
                  width: "60%",
                  [appTheme.breakpoints.down("lg")]: {
                    width: "70%",
                  },
                  [appTheme.breakpoints.down("md")]: {
                    width: "100%",
                  },
                  "& .MuiOutlinedInput-root": {
                    padding: "0.2rem",
                  },
                }}
              ></AutoCompleteSearch>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              sx={{
                color: appTheme.palette.sunglow.main,
                paddingBlock: "0.5rem",
                [appTheme.breakpoints.up("md")]: {
                  display: "none",
                },
              }}
              id="menu-icon"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon></MenuIcon>
            </IconButton>
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
        <Menu
          id="navbar-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: appTheme.palette.primary.main,
              color: "white",
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <LoginIcon sx={{ marginRight: "0.5rem" }} />
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Prihlásiť
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <PersonAddOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            <Link
              to="/register"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Registrovať
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
