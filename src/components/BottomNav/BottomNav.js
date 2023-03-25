import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { appTheme } from "../../themes/appTheme";

import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { BottomNavLink } from "./BottomNavLink";
import { linksArray } from "./linksArray";
import { boxStyle } from "./bottomNavStyles";

export const BottomNav = ({ screen }) => {
  const { pathname } = useLocation();
  const { tournamentId } = useParams();
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));
  const [activeLink, setActiveLink] = useState(pathname);
  const iconSize = 20;
  const links = linksArray(screen, tournamentId, iconSize);

  useEffect(() => {
    const path = pathname;
    links.forEach(({ to, title }) => {
      if (path.startsWith(to)) {
        setActiveLink(title);
      }
    });
  }, []);

  const handleClick = (title) => {
    setActiveLink(title);
  };

  return (
    <Box sx={boxStyle(isTabletSize, screen)}>
      {links.map(({ title, to, icon, activeIcon, hidden }) => (
        <BottomNavLink
          key={title}
          title={title}
          hidden={hidden}
          to={to}
          activeLink={activeLink}
          handleClick={handleClick}
          icon={icon}
          activeIcon={activeIcon}
        ></BottomNavLink>
      ))}
    </Box>
  );
};
