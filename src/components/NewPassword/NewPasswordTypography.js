import { appTheme } from "../../themes/appTheme";
import { Grid, Typography } from "@mui/material";

export const NewPasswordTypography = () => {
  return (
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Typography
        variant="h2"
        fontSize="1.5rem"
        textTransform="uppercase"
        letterSpacing="0.2rem"
        sx={{ color: appTheme.palette.sunglow.main }}
      >
        Vytvorenie nového hesla
      </Typography>
    </Grid>
  );
};
