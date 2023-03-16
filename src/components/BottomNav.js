import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import { Box, IconButton, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { appTheme } from "../themes/appTheme";
import BadmintonPlayerIcon from "../icons/BadmintonPlayerIcon";
import MatchesIcon from "../icons/MatchesIcon";
import TableIcon from "../icons/TableIcon";
import HomeIcon from "../icons/HomeIcon";

export const BottomNav = ({ screen }) => {
  const { pathname } = useLocation();
  const { tournamentId } = useParams();
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));

  const [activeLink, setActiveLink] = useState(pathname);

  const links = [
    {
      title: "Turnaje",
      to: `/tournaments`,
      icon: (
        <HomeIcon
          width={20}
          height={20}
          fill={activeLink === "/tournaments" ? "#a1abc4" : "white"}
        />
      ),
    },
    {
      title: "Hráči",
      to: `/tournaments/${tournamentId}`,
      icon: (
        <BadmintonPlayerIcon
          width={20}
          height={20}
          fill={
            activeLink === `/tournaments/${tournamentId}` ? "#a1abc4" : "white"
          }
        />
      ),
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Zápasy",
      to: `/tournaments/${tournamentId}/matches`,
      icon: (
        <MatchesIcon
          width={20}
          height={20}
          fill={
            activeLink === `/tournaments/${tournamentId}/matches`
              ? "#a1abc4"
              : "white"
          }
        />
      ),
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Tabuľka",
      to: `/tournaments/${tournamentId}/table`,
      icon: (
        <TableIcon
          width={20}
          height={20}
          fill={
            activeLink === `/tournaments/${tournamentId}/table`
              ? "#a1abc4"
              : "white"
          }
        />
      ),
      hidden: screen === "tournaments" || screen === "profile",
    },
  ];

  const handleClick = (to) => {
    setActiveLink(to);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "70px",
        backgroundColor: "#303a53",
        display: isTabletSize ? "flex" : "none",
        justifyContent:
          screen === "tournaments" || screen === "profile"
            ? "center"
            : "space-between",
        paddingInline: "2rem",
        alignItems: "center",
      }}
    >
      {links.map(({ title, to, icon, hidden }) => (
        <Link
          key={title}
          style={{
            textDecoration: "none",
            display: hidden ? "none" : "flex",
            color: "white",
            alignItems: "center",
          }}
          to={to}
          onClick={() => handleClick(to)}
          className={to === activeLink ? "active" : ""}
        >
          <Box
            key={title}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconButton
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {icon}
              <Typography
                sx={{
                  color: to === activeLink ? "#a1abc4" : "white",
                  marginTop: "0.5rem",
                }}
              >
                {title}
              </Typography>
            </IconButton>
          </Box>
        </Link>
      ))}
    </Box>
  );
};
