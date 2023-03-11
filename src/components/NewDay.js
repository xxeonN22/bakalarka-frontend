import {
  Button,
  Paper,
  IconButton,
  TextField,
  Box,
  Grid,
  Autocomplete,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import dayjs from "dayjs";
import "dayjs/locale/sk";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const NewDay = (props) => {
  /* Získame pristup k objektu do ktoreho ulozime data o hracich dnoch */
  const {
    message,
    setMessage,
    newTournament,
    handleAddGameDay,
    handleRemoveGameDay,
    handleGameDayChange,
  } = props;

  /* Ziskame pristup k hodnote poctu skupin, ktore uzivatel zvolil v predoslom kroku */
  const numberOfGroups = newTournament.numberOfGroups;
  let groups = [];
  for (let i = 0; i < numberOfGroups; i++) {
    const letter = String.fromCharCode(65 + i);
    const group = {
      label: `Skupina - ${letter}`,
    };
    groups = [...groups, group];
  }

  /* Ziskame pristup k hodnote poctu kôl, ktore uzivatel zvolil v predoslom kroku */
  const numberOfRounds = newTournament.numberOfRounds;
  let rounds = [];
  for (let i = 0; i < numberOfRounds; i++) {
    const round = {
      label: `Kolo ${i + 1}`,
    };
    rounds = [...rounds, round];
  }

  return (
    <>
      {message.gameDaysMessage && (
        <Alert
          sx={{ marginBlock: "1rem" }}
          severity={"error"}
          onClose={() => {
            setMessage({
              ...message,
              gameDaysMessage: null,
            });
          }}
        >
          {message.gameDaysMessage}
        </Alert>
      )}
      <Grid container spacing={2}>
        {newTournament.gameDays.map((gameDay, index) => {
          const selectedGroups = gameDay.groups || [];
          return (
            <Grid item xs={12} sm={6} key={gameDay.id}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  paddingInline: "0.5rem",
                }}
              >
                <IconButton
                  aria-label="odstranit-turnaj"
                  onClick={() => handleRemoveGameDay(gameDay.id)}
                >
                  <DeleteIcon />
                </IconButton>

                <Autocomplete
                  freeSolo
                  multiple
                  limitTags={1}
                  id={`groups-${gameDay.id}`}
                  options={groups}
                  getOptionLabel={(group) => group.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Vyberte skupinu" />
                  )}
                  onChange={(event, value) =>
                    handleGameDayChange(gameDay.id, "groups", value)
                  }
                  value={selectedGroups}
                  getOptionDisabled={(option) =>
                    selectedGroups.some(
                      (selected) => selected.label === option.label
                    )
                  }
                  sx={{ width: "100%", marginBottom: "1rem" }}
                />

                <Autocomplete
                  freeSolo
                  id={`rounds-${gameDay.id}`}
                  options={rounds}
                  renderInput={(params) => (
                    <TextField {...params} label="Vyberte kolo" />
                  )}
                  onChange={(event, value) =>
                    handleGameDayChange(gameDay.id, "round", value)
                  }
                  value={gameDay?.round}
                  sx={{ width: "100%", marginBottom: "1rem" }}
                />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="sk"
                >
                  <DatePicker
                    sx={{ width: "100%", marginBottom: "1rem" }}
                    label="Vyberte dátum"
                    format="DD/MM/YYYY"
                    value={dayjs(gameDay.date || new Date())}
                    minDate={dayjs(new Date())}
                    onChange={(newValue) => {
                      handleGameDayChange(gameDay.id, "date", newValue);
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    sx={{ width: "100%", marginBottom: "1rem" }}
                    label="Vyberte čas"
                    format="HH:mm"
                    ampm={false}
                    value={dayjs(gameDay.time || new Date())}
                    onChange={(newValue) => {
                      handleGameDayChange(gameDay.id, "time", newValue);
                    }}
                  />
                </LocalizationProvider>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Button variant="contained" onClick={handleAddGameDay}>
          Pridať hrací deň
        </Button>
      </Box>
    </>
  );
};