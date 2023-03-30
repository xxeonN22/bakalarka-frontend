import { appTheme } from "../../themes/appTheme";
import { Grid } from "@mui/material";

import { Tournament } from "../Tournament";

export const TournamentData = (props) => {
  const {
    filteredData,
    setTournamentData,
    tournamentData,
    setResponseMessage,
  } = props;
  return (
    <Grid
      container
      sx={{
        marginTop: "5rem",
        marginBottom: "2rem",
        [appTheme.breakpoints.down("sm")]: { marginTop: "2rem" },
      }}
      spacing={2}
    >
      {filteredData.map((data) => (
        <Tournament
          key={data.id_tournament}
          tournamentId={data.id_tournament}
          name={data.name}
          sportType={data.sport_type}
          playersNumber={data.players_count}
          setTournamentData={setTournamentData}
          tournamentData={tournamentData}
          setResponseMessage={setResponseMessage}
        />
      ))}
    </Grid>
  );
};
