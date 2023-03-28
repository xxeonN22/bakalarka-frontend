import {
  Button,
  Paper,
  IconButton,
  TextField,
  Box,
  Grid,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { LocalizationProvider, csCZ, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/sk";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useEffect, useState } from "react";
import { api } from "../../axios/axios";
import { useNavigate } from "react-router-dom";

export const NewGameDay = ({
  tournamentId,
  handleNewGameDay,
  handleCloseModal,
}) => {
  const navigate = useNavigate();
  const [newGameDay, setNewGameDay] = useState({
    rounds: [],
    groups: [],
    selectedGroups: [],
    selectedRound: "",
    date: new Date(),
    time: new Date(),
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/players/tournament/${tournamentId}`);
        setNewGameDay({
          ...newGameDay,
          rounds: response.data.rounds,
          groups: response.data.groups,
        });
        console.log(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
          return;
        }
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    })();
  }, []);

  let groups = [];
  for (let i = 0; i < newGameDay.groups.length; i++) {
    const group = newGameDay.groups[i].group_name;
    groups = [...groups, group];
  }

  let rounds = [];
  for (let i = 0; i < newGameDay.rounds.length; i++) {
    const round = `Kolo ${newGameDay.rounds[i].round_number}`;
    rounds = [...rounds, round];
  }

  console.log(newGameDay);

  return (
    <>
      <Box sx={{ marginTop: "2rem" }}>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingInline: "0.5rem",
          }}
        >
          <Autocomplete
            freeSolo
            multiple
            limitTags={1}
            id={`groups-${tournamentId}`}
            options={groups}
            getOptionLabel={(group) => group}
            renderInput={(params) => (
              <TextField {...params} label="Vyberte skupinu" />
            )}
            onChange={(event, newValue) => {
              setNewGameDay({
                ...newGameDay,
                selectedGroups: newValue,
              });
            }}
            value={newGameDay.selectedGroups}
            getOptionDisabled={(option) =>
              newGameDay.selectedGroups.some((selected) => selected === option)
            }
            sx={{ width: "100%", marginBottom: "1rem" }}
          />

          <Autocomplete
            freeSolo
            id={`rounds-${tournamentId}`}
            options={rounds}
            renderInput={(params) => (
              <TextField {...params} label="Vyberte kolo" />
            )}
            onChange={(event, newValue) => {
              setNewGameDay({
                ...newGameDay,
                selectedRound: newValue,
              });
            }}
            value={newGameDay?.selectedRound}
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="sk"
            localeText={
              csCZ.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <DatePicker
              sx={{ width: "100%", marginBottom: "1rem" }}
              label="Vyberte dátum"
              format="DD/MM/YYYY"
              value={dayjs(newGameDay.date)}
              minDate={dayjs(new Date())}
              onChange={(newValue) => {
                setNewGameDay({
                  ...newGameDay,
                  date: newValue,
                });
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="sk"
            localeText={
              csCZ.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <TimePicker
              sx={{ width: "100%", marginBottom: "1rem" }}
              label="Vyberte čas"
              format="HH:mm"
              ampm={false}
              value={dayjs(newGameDay.time)}
              onChange={(newValue) => {
                setNewGameDay({
                  ...newGameDay,
                  time: newValue,
                });
              }}
            />
          </LocalizationProvider>
        </Paper>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Button
          onClick={() => {
            handleNewGameDay(newGameDay);
            handleCloseModal();
          }}
          variant="contained"
        >
          Vytvoriť hrací deň
        </Button>
      </Box>
    </>
  );
};
