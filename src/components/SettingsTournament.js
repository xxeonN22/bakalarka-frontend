import { TextField, Grid } from "@mui/material";
import { TextFieldIncrement } from "../components/TextFieldIncrement";

export const SettingsTournament = (props) => {
  const sportsWithSets = ["badminton", "volejbal", "tenis", "stolny-tenis"];
  const maxNumberPointsSports = ["badminton", "volejbal"];

  const { handleTournamentSettingsChange, newTournament } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="Názov turnaja"
          value={newTournament?.tournamentName}
          onChange={(e) =>
            handleTournamentSettingsChange("tournamentName", e.target.value)
          }
        ></TextField>
      </Grid>
      {sportsWithSets.includes(newTournament.selectedSport) && (
        <>
          <Grid item xs={12} md={6}>
            <TextFieldIncrement
              isRequired={true}
              value={newTournament.maxNumberOfSets}
              functionName={(value) =>
                handleTournamentSettingsChange("maxNumberOfSets", value)
              }
              label={`Počet setov v zápase`}
              id={`max-sets`}
              min={1}
              max={10}
            ></TextFieldIncrement>
          </Grid>
        </>
      )}
      {maxNumberPointsSports.includes(newTournament.selectedSport) && (
        <>
          <Grid item xs={12} md={6}>
            <TextFieldIncrement
              isRequired={true}
              value={newTournament.maxNumberOfPoints}
              functionName={(value) =>
                handleTournamentSettingsChange("maxNumberOfPoints", value)
              }
              label={`Počet bodov v sete`}
              id={`max-points`}
              min={1}
              max={100}
            ></TextFieldIncrement>
          </Grid>
        </>
      )}
      <Grid item xs={12} md={6}>
        <TextFieldIncrement
          isRequired={true}
          value={newTournament.numberOfGroups}
          functionName={(value) =>
            handleTournamentSettingsChange("numberOfGroups", value)
          }
          label={`Počet skupín`}
          id={`tournament-groups`}
          min={1}
          max={10}
        ></TextFieldIncrement>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextFieldIncrement
          isRequired={true}
          value={newTournament.numberOfRounds}
          functionName={(value) =>
            handleTournamentSettingsChange("numberOfRounds", value)
          }
          label={`Počet kôl`}
          id={`tournament-rounds`}
          min={1}
          max={10}
        ></TextFieldIncrement>
      </Grid>
    </Grid>
  );
};
