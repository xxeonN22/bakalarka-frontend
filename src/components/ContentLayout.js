import Box from "@mui/material/Box";
import { appTheme } from "../themes/appTheme";
import { SideBar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { BottomNav } from "./BottomNav/BottomNav";

export const ContentLayout = ({
  screen,
  children,
  backGround,
  setResponseMessage,
}) => {
  const boxStyle = {
    marginTop: "0px",
    marginLeft: "100px",
    padding: "3rem",
    backgroundColor: backGround,
    minHeight: "100vh",
    position: "relative",
    [appTheme.breakpoints.down("md")]: {
      marginBlock: "70px",
      marginLeft: "0px",
      paddingBlock: "2rem",
      paddingInline: "2rem",
      minHeight: `calc(100vh - 140px)`,
    },
    [appTheme.breakpoints.down("sm")]: {
      paddingInline: "0.5rem",
    },
    [appTheme.breakpoints.up("sm")]: {
      paddingInline: "1rem",
    },
    [appTheme.breakpoints.up("md")]: {
      paddingInline: "3rem",
    },
  };

  return (
    <>
      <SideBar screen={screen}></SideBar>
      <Navbar screen={screen} setResponseMessage={setResponseMessage}></Navbar>
      <Box sx={boxStyle}>{children}</Box>
      <BottomNav screen={screen}></BottomNav>
    </>
  );
};
