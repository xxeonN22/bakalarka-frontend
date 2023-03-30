/* Override the default themeing of MUI library */
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      dark: "#161C27",
      main: "#1F2736",
      light: "#34415B",
    },
    sunglow: {
      dark: "#F1BA04",
      main: "#FCCE36",
      light: "#FDD85E",
      contrastText: "#1F2736",
    },
    error: {
      main: "#B72A4D",
      dark: "#96223F",
      light: "#D2375E",
      contrastText: "#F8F8F8",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#FCCE36",
          "&.Mui-checked": {
            color: "#FCCE36",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});
