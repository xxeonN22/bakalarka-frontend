import Box from "@mui/material/Box";
import { NavbarNotLoggedIn } from "./NavbarNotLoggedIn";

const boxStyle = {
  paddingTop: "70px",
  minHeight: "100vh",
  backgroundColor: "#252E42",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const ContentNotLogged = ({ screen, children, setResponseMessage }) => {
  return (
    <>
      <NavbarNotLoggedIn
        setResponseMessage={setResponseMessage}
      ></NavbarNotLoggedIn>
      <Box sx={boxStyle}>{children}</Box>
    </>
  );
};
