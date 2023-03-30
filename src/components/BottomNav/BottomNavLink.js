import { NavLink } from "react-router-dom";
import { Typography, Box, IconButton } from "@mui/material";

export const BottomNavLink = (props) => {
  const { title, hidden, to, activeLink, handleClick, icon, activeIcon } =
    props;
  return (
    <NavLink
      style={{
        textDecoration: "none",
        display: hidden ? "none" : "flex",
        color: "white",
        alignItems: "center",
      }}
      to={to}
      onClick={() => handleClick(title)}
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
          {activeLink === title ? activeIcon : icon}
          <Typography
            sx={{
              color: title === activeLink ? "#FCCE36" : "white",
              marginTop: "0.5rem",
            }}
          >
            {title}
          </Typography>
        </IconButton>
      </Box>
    </NavLink>
  );
};
