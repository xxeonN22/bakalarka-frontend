import { appTheme } from "../../themes/appTheme";
import { Typography } from "@mui/material";

export const RegisterTypography = () => {
  return (
    <Typography
      variant="h2"
      textTransform="uppercase"
      sx={{
        fontSize: "1.5rem",
        letterSpacing: "0.2rem",
        [appTheme.breakpoints.down("md")]: {
          fontSize: "1.1rem",
          letterSpacing: "0.1rem",
        },
      }}
    >
      Registrácia používateľa
    </Typography>
  );
};
