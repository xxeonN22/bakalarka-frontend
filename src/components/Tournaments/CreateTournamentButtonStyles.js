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
  width: "50%",
  [appTheme.breakpoints.down("xl")]: {
    width: "70%",
  },
  [appTheme.breakpoints.down("lg")]: {
    width: "100%",
  },
};
