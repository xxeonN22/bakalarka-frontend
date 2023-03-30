import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { api } from "../axios/axios";
import { Box, IconButton } from "@mui/material";
import { SideBarTooltip } from "./SideBarTooltip";

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
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const path = location.pathname;
    links.forEach(({ to, title }) => {
      if (path.startsWith(to)) {
        setActiveLink(title);
      }
    });
  }, []);

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

  const links = [
    {
      title: "Turnaje",
      to: `/tournaments`,
      icon: <HomeIcon width={40} height={40} fill={"white"} />,
      activeIcon: <HomeIcon width={40} height={40} fill={"#FCCE36"} />,
    },
    {
      title: "Hráči",
      to: `/tournaments/${tournamentId}`,
      icon: <BadmintonPlayerIcon width={40} height={40} fill={"white"} />,
      activeIcon: (
        <BadmintonPlayerIcon width={40} height={40} fill={"#FCCE36"} />
      ),
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Zápasy",
      to: `/tournaments/${tournamentId}/matches`,
      icon: <MatchesIcon width={40} height={40} fill={"white"} />,
      activeIcon: <MatchesIcon width={40} height={40} fill={"#FCCE36"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Tabuľka",
      to: `/tournaments/${tournamentId}/table`,
      icon: <TableIcon width={40} height={40} fill={"white"} />,
      activeIcon: <TableIcon width={40} height={40} fill={"#FCCE36"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
  ];

  return (
    <Box sx={sidebarStyles}>
      {links.map(({ title, to, icon, activeIcon, hidden }) => (
        <Box
          key={title}
          sx={{
            ...linkStyles,
            display: hidden ? "none" : linkStyles.display,
          }}
        >
          <SideBarTooltip title={title}>
            <NavLink to={to} onClick={() => setActiveLink(title)}>
              <IconButton>
                {activeLink === title ? activeIcon : icon}
              </IconButton>
            </NavLink>
          </SideBarTooltip>
        </Box>
      ))}
      <Box
        key="Odhlásiťsa"
        sx={{
          ...linkStyles,
          marginTop: "auto",
        }}
      >
        <SideBarTooltip title={"Odhlásiť sa"}>
          <IconButton onClick={handleLogOut}>
            <LogoutIcon width={40} height={40} fill={"white"}></LogoutIcon>
          </IconButton>
        </SideBarTooltip>
      </Box>
    </Box>
  );
};
