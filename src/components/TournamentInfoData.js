import { appTheme } from "../themes/appTheme";
import { Grid, Typography } from "@mui/material";

export const TournamentInfoData = ({ adminData, tournamentName }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginBottom: "2rem",
        [appTheme.breakpoints.down("md")]: { textAlign: "center" },
      }}
    >
      <Grid item xs={12} sm={6} lg={4}>
        <Typography
          variant="h2"
          fontSize="1.2rem"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Názov turnaja:{" "}
          <span
            style={{
              fontWeight: "500",
              marginLeft: "0.5rem",
              fontSize: "1.5rem",
            }}
          >
            {tournamentName}
          </span>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          [appTheme.breakpoints.down("lg")]: {
            justifyContent: "flex-end",
          },
          [appTheme.breakpoints.down("sm")]: {
            justifyContent: "center",
          },
        }}
      >
        <Typography variant="h2" fontSize="1.1rem">
          Organizátor: {adminData.firstName} {adminData.lastName}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        lg={4}
        sx={{
          justifyContent: "right",
          display: "flex",
          alignItems: "center",
          [appTheme.breakpoints.down("lg")]: {
            justifyContent: "center",
          },
        }}
      >
        <Typography variant="h2" fontSize="1.1rem">
          Kontakt: {adminData.email}
        </Typography>
      </Grid>
    </Grid>
  );
};
