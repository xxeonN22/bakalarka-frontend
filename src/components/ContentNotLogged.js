import Box from "@mui/material/Box";
import { NavbarNotLoggedIn } from "./NavbarNotLoggedIn";

const boxStyle = (backGround = "#252E42", position = "center") => {
  return {
    paddingTop: "70px",
    minHeight: "100vh",
    backgroundColor: backGround,
    display: "flex",
    justifyContent: "center",
    alignItems: position,
  };
};

export const ContentNotLogged = ({
  screen,
  children,
  setResponseMessage,
  backGround,
  position,
}) => {
  return (
    <>
      <NavbarNotLoggedIn
        setResponseMessage={setResponseMessage}
      ></NavbarNotLoggedIn>
      <Box sx={boxStyle(backGround, position)}>{children}</Box>
    </>
  );
};
