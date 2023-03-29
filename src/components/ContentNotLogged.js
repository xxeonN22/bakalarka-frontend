import Box from "@mui/material/Box";
import { NavbarNotLoggedIn } from "./NavbarNotLoggedIn";

const boxStyle = (
  backGround = "#252E42",
  position = "center",
  flexDirection = "row",
  justifyContent = "center"
) => {
  return {
    paddingTop: "70px",
    minHeight: "100vh",
    backgroundColor: backGround,
    display: "flex",
    flexDirection: flexDirection,
    justifyContent: justifyContent,
    alignItems: position,
  };
};

export const ContentNotLogged = ({
  screen,
  children,
  setResponseMessage,
  backGround,
  position,
  flexDirection,
  justifyContent,
}) => {
  return (
    <>
      <NavbarNotLoggedIn
        setResponseMessage={setResponseMessage}
      ></NavbarNotLoggedIn>
      <Box sx={boxStyle(backGround, position, flexDirection, justifyContent)}>
        {children}
      </Box>
    </>
  );
};
