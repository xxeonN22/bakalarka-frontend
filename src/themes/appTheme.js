/* Override the default themeing of MUI library */
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#1F2736",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});
