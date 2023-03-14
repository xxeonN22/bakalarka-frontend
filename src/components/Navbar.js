import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { appTheme } from "../themes/appTheme";
import {
  Box,
  Drawer,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "../icons/LogoutIcon";
import ProfileIcon from "../icons/ProfileIcon";
import BadmintonPlayerIcon from "../icons/BadmintonPlayerIcon";
import MatchesIcon from "../icons/MatchesIcon";
import TableIcon from "../icons/TableIcon";
import HomeIcon from "../icons/HomeIcon";

const navbarStyle = {
  display: "none",
  width: "100%",
  [appTheme.breakpoints.down("md")]: {
    display: "initial",
  },
};

const boxStyle = {
  display: "flex",
  marginBottom: "2rem",
  alignItems: "center",
  position: "relative",
  paddingBottom: "0.5rem",
  "&::before, &::after": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "1px",
    backgroundColor: "white",
    transition: "width 0.5s ease",
    width: 0,
  },
  "&:hover::before, &:hover::after": {
    width: "100%",
  },
};

export const Navbar = ({ screen }) => {
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));
  const [isOpened, setIsOpened] = useState(false);
  const { pathname } = useLocation();
  const { tournamentId } = useParams();

  useEffect(() => {
    if (!isTabletSize) {
      setIsOpened(false);
    }
  }, [isTabletSize]);

  const links = [
    {
      title: "Profil",
      to: "/profile",
      icon: <ProfileIcon width={25} height={25} fill={"white"} />,
    },
    {
      title: "Turnaje",
      to: `/tournaments`,
      icon: <HomeIcon width={25} height={25} fill={"white"} />,
    },
    {
      title: "Hráči",
      to: `/tournaments/${tournamentId}`,
      icon: <BadmintonPlayerIcon width={25} height={25} fill={"white"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Zápasy",
      to: `/tournaments/${tournamentId}/matches`,
      icon: <MatchesIcon width={25} height={25} fill={"white"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Tabuľka",
      to: `/tournaments/${tournamentId}/table`,
      icon: <TableIcon width={25} height={25} fill={"white"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
  ];

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
            {links.map(({ title, to, icon, hidden }) => (
              <Link
                style={{
                  textDecoration: "none",
                  width: "100%",
                  justifyContent: "center",
                  display: hidden ? "none" : "flex",
                  color: "inherit",
                  alignItems: "center",
                }}
                to={to}
                className={to === pathname ? "active" : ""}
              >
                <Box key={title} sx={boxStyle}>
                  <IconButton sx={{ marginRight: "0.5rem", padding: "0px" }}>
                    {icon}
                  </IconButton>
                  <Typography variant="h2" fontSize="1.15rem" color="white">
                    {title}
                  </Typography>
                </Box>
              </Link>
            ))}
            <Link
              style={{
                textDecoration: "none",
                width: "100%",
                justifyContent: "center",
                color: "inherit",
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
              }}
              to="/"
              className={"/" === pathname ? "active" : ""}
            >
              <Box sx={boxStyle}>
                <LogoutIcon width={25} height={25} fill={"white"}></LogoutIcon>
                <Typography
                  sx={{ marginLeft: "0.5rem" }}
                  variant="h2"
                  fontSize="1.15rem"
                  color="white"
                >
                  Odhlásiť sa
                </Typography>
              </Box>
            </Link>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
