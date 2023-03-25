import { appTheme } from "../../themes/appTheme";

export const gridItemStyle = {
  display: "flex",
  alignItems: "center",
  [appTheme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
  [appTheme.breakpoints.up("lg")]: {
    justifyContent: "flex-end",
  },
};

export const createTournamentStyle = {
  paddingBlock: "1rem",
  [appTheme.breakpoints.down("lg")]: {
    width: "90%",
  },
  [appTheme.breakpoints.down("sm")]: {
    width: "100%",
  },
};
