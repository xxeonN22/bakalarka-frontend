import { appTheme } from "../themes/appTheme";
import { Grid, Typography, Paper } from "@mui/material";

export const ImportPlayersText = ({ groups }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} textAlign="center" sx={{ marginBottom: "0.4rem" }}>
          <Typography sx={{ marginBottom: "1rem" }}>
            Zoznam vaších skupín
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
          spacing={2}
        >
          {groups.map((group) => (
            <Grid key={group.group_name} item xs={6} sm={4}>
              <Paper
                sx={{
                  padding: "0.3rem",
                  backgroundColor: appTheme.palette.primary.main,
                  color: "white",
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {group.group_name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Typography
        textAlign="center"
        sx={{
          marginBottom: "1rem",
          backgroundColor: appTheme.palette.primary.main,
          color: "white",
          padding: "0.5rem",
          borderRadius: "4px",
        }}
      >
        Každý riadok v súbore .csv musí byť v tvare:
      </Typography>
      <Typography
        textAlign="center"
        sx={{
          marginBottom: "1rem",
          backgroundColor: appTheme.palette.primary.main,
          color: "white",
          padding: "0.5rem",
          borderRadius: "4px",
          letterSpacing: "0.04rem",
        }}
      >
        Meno, Priezvisko, email, SKUPINA - ?, elo kde každá hodnota je jedna
        bunka
      </Typography>
    </>
  );
};
