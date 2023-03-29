import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const convertDate = (dateToConvert) => {
  const dateObject = new Date(dateToConvert);
  const date = dateObject.toLocaleDateString("sk-SK");
  return date;
};

export const PlayerProfileAttendance = (props) => {
  const { isLoading, playerAttendance, playerId } = props;
  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="player-stats"
        id="player-stats-header"
        sx={{ textAlign: "center" }}
      >
        <Typography>Účasti hráča</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {!isLoading &&
            playerAttendance.map((attendance) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  xl={4}
                  key={attendance.id_confirmation}
                >
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBlock: "0.4rem",
                      position: "relative",
                    }}
                  >
                    <IconButton
                      sx={{ position: "absolute", top: 0 }}
                      onClick={() =>
                        console.log(attendance.id_confirmation, playerId)
                      }
                    >
                      <InfoOutlinedIcon></InfoOutlinedIcon>
                    </IconButton>
                    <Typography sx={{ marginTop: "1.7rem" }}>
                      {" "}
                      Dátum: {convertDate(attendance.date)}
                    </Typography>
                    <Typography sx={{ marginBlock: "0.3rem" }}>
                      {" "}
                      Čas: {attendance.time.substring(0, 5)}
                    </Typography>
                    <Typography>Účasť: {attendance.status}</Typography>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
