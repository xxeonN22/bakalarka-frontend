import { Link, useLocation } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import { SideBarTooltip } from "./SideBarTooltip";

import ProfileIcon from "../icons/ProfileIcon";
import BadmintonPlayerIcon from "../icons/BadmintonPlayerIcon";
import MatchesIcon from "../icons/MatchesIcon";
import TableIcon from "../icons/TableIcon";
import LogoutIcon from "../icons/LogoutIcon";
import HomeIcon from "../icons/HomeIcon";

import { appTheme } from "../themes/appTheme";

const sidebarStyles = {
  height: "100vh",
  position: "fixed",
  backgroundColor: "#1F2736",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBlock: "3rem",
  paddingInline: "1rem",
  gap: "2rem",
  width: "100px",
  [appTheme.breakpoints.down("md")]: {
    display: "none",
  },
};

const linkStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyItems: "center",
};

export const SideBar = ({ screen }) => {
  const { pathname } = useLocation();

  const links = [
    {
      title: "Profil",
      to: "/profile",
      icon: <ProfileIcon width={40} height={40} fill={"white"} />,
    },
    {
      title: "Turnaje",
      to: "/tournaments",
      icon: <HomeIcon width={40} height={40} fill={"white"} />,
    },
    {
      title: "Hráči",
      to: "/players",
      icon: <BadmintonPlayerIcon width={40} height={40} fill={"white"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Zápasy",
      to: "/matches",
      icon: <MatchesIcon width={40} height={40} fill={"white"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Tabuľka",
      to: "/table",
      icon: <TableIcon width={40} height={40} fill={"white"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
  ];

  return (
    <Box sx={sidebarStyles}>
      {links.map(({ title, to, icon, hidden }) => (
        <Box
          key={title}
          sx={{
            ...linkStyles,
            display: hidden ? "none" : linkStyles.display,
          }}
        >
          <SideBarTooltip title={title}>
            <Link to={to} className={to === pathname ? "active" : ""}>
              <IconButton>{icon}</IconButton>
            </Link>
          </SideBarTooltip>
        </Box>
      ))}
      <Box
        sx={{
          ...linkStyles,
          marginTop: "auto",
        }}
      >
        <SideBarTooltip title={"Odhlásiť sa"}>
          <IconButton>
            <LogoutIcon width={40} height={40} fill={"white"}></LogoutIcon>
          </IconButton>
        </SideBarTooltip>
      </Box>
    </Box>
  );
};
