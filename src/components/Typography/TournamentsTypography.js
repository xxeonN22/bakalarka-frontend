import { appTheme } from "../../themes/appTheme";
import { Grid, Typography } from "@mui/material";

export const TournamentsTypography = () => {
  return (
    <Grid item xs={12} lg={8}>
      <Typography
        variant="h2"
        fontSize="1.5rem"
        sx={{
          width: "60%",
          [appTheme.breakpoints.down("lg")]: {
            textAlign: "center",
            width: "100%",
          },
        }}
      >
        Vytvorte turnaj vo vašom obľubenom športe a nenechajte sa rušiť pri jeho{" "}
        <span style={{ borderBottom: "3px solid white" }}>organizácii.</span>
      </Typography>
    </Grid>
  );
};
