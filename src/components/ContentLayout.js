import Box from "@mui/material/Box";
import { appTheme } from "../themes/appTheme";
import { SideBar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";

export const ContentLayout = ({ screen, children, backGround }) => {
  const boxStyle = {
    marginTop: "0px",
    marginLeft: "100px",
    padding: "3rem",
    backgroundColor: backGround,
    minHeight: "100vh",
    [appTheme.breakpoints.down("md")]: {
      marginTop: "70px",
      marginLeft: "0px",
      paddingBlock: "2rem",
      paddingInline: "2rem",
      minHeight: `calc(100vh - 70px)`,
    },
    [appTheme.breakpoints.down("sm")]: {
      paddingInline: "1rem",
    },
  };

  return (
    <>
      <SideBar screen={screen}></SideBar>
      <Navbar></Navbar>
      <Box sx={boxStyle}>{children}</Box>
    </>
  );
};
