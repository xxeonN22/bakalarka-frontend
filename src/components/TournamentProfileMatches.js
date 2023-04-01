import { appTheme } from "../themes/appTheme";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const TournamentProfileMatches = ({ tournamentData }) => {
  return (
    <Accordion
      sx={{
        width: "100%",
        background: appTheme.palette.primary.main,
        color: "white",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="sunglow" />}
        aria-controls="player-credentials"
        id="player-credentials-header"
        sx={{ textAlign: "center" }}
      >
        <Typography>Aktuálne zápasy, ktoré sú na programe</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {tournamentData.matches.map((match, index) => (
            <Grid item xs={12} key={match[0]}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor:
                    index % 2 === 0
                      ? appTheme.palette.primary.dark
                      : appTheme.palette.primary.main,
                  color: "white",
                  padding: "1rem",
                  borderRadius: "4px",
                  [appTheme.breakpoints.down("md")]: {
                    position: "relative",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    [appTheme.breakpoints.down("md")]: {
                      position: "absolute",
                      top: 0,
                      left: 10,
                    },
                  }}
                >
                  {match[1]}
                </Typography>
                <Typography
                  variant="h2"
                  fontSize="1.15rem"
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    [appTheme.breakpoints.down("md")]: {
                      display: "none",
                    },
                  }}
                >
                  {match[2][0].elo}
                </Typography>
                <Typography
                  sx={{
                    flex: 3,
                    textAlign: "center",
                    maxWidth: "35%",
                    wordWrap: "break-word",
                    paddingInline: "1rem",
                  }}
                >
                  {match[2][0].first_name} {match[2][0].last_name}
                </Typography>
                <Typography
                  sx={{
                    flex: 3,
                    textAlign: "center",
                    maxWidth: "30%",
                    wordWrap: "break-word",
                    paddingInline: "1rem",
                  }}
                >
                  {match[3][0].first_name} {match[3][0].last_name}
                </Typography>
                <Typography
                  variant="h2"
                  fontSize="1.15rem"
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    [appTheme.breakpoints.down("md")]: {
                      display: "none",
                    },
                  }}
                >
                  {match[3][0].elo}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
