import { appTheme } from "../../themes/appTheme";
import { Typography } from "@mui/material";

export const LoginTypography = () => {
  return (
    <Typography
      variant="h2"
      textTransform="uppercase"
      sx={{
        fontSize: "1.5rem",
        letterSpacing: "0.2rem",
        textAlign: "center",
        color: appTheme.palette.sunglow.main,
        [appTheme.breakpoints.down("sm")]: {
          fontSize: "1.2rem",
          letterSpacing: "0.1rem",
        },
      }}
    >
      Prihlásenie používateľa
    </Typography>
  );
};
