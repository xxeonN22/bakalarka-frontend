import Box from "@mui/material/Box";
import { appTheme } from "../themes/appTheme";
import { SideBar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";

const boxStyle = {
  marginTop: "0px",
  marginLeft: "100px",
  padding: "3rem",
  [appTheme.breakpoints.down("md")]: {
    marginTop: "70px",
    marginLeft: "0px",
    paddingBlock: "2rem",
    paddingInline: "2rem",
  },
  [appTheme.breakpoints.down("sm")]: {
    paddingInline: "1rem",
  },
};

export const ContentLayout = ({ screen, children }) => {
  return (
    <>
      <SideBar screen={screen}></SideBar>
      <Navbar></Navbar>
      <Box sx={boxStyle}>{children}</Box>
    </>
  );
};
