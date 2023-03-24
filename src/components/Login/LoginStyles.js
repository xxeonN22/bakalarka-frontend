import { appTheme } from "../../themes/appTheme";

export const containerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
  [appTheme.breakpoints.down("md")]: {
    paddingInline: "5rem",
  },
  [appTheme.breakpoints.down("sm")]: {
    paddingInline: "2rem",
  },
};

export const gridContainerStyle = {
  paddingBlock: "2rem",
  rowGap: "2rem",
  [appTheme.breakpoints.up("md")]: {
    paddingInline: "10rem",
  },
  [appTheme.breakpoints.up("xs")]: {
    paddingInline: "2rem",
  },
};

export const gridItemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
