import { useState, useEffect } from "react";
import { api } from "../../axios/axios";
import { useNavigate } from "react-router-dom";

import { Paper, TextField, Autocomplete, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { LocalizationProvider, csCZ, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/sk";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export const EditRound = (props) => {
  const {
    tournamentId,
    editRoundId,
    editGamedayId,
    handleDeleteGameDay,
    handleEditGameDay,
    handleDialogClose,
  } = props;
  const navigate = useNavigate();

  const [gameDayData, setGameDayData] = useState({
    tournamentId: tournamentId,
    roundId: editRoundId,
    gameDayId: editGamedayId,
    rounds: [],
    groups: [],
    selectedGroups: [],
    selectedRound: "",
    selectedDate: "",
    selectedTime: "",
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(
          `/tournaments/edditround/${tournamentId}/${editRoundId}/${editGamedayId}`
        );
        const newGroups = response.data.groupsGameDay.map(
          (group) => group.group_name
        );
        console.log(response.data);
        setGameDayData({
          ...gameDayData,
          rounds: response.data.rounds,
          groups: response.data.groups,
          selectedGroups: newGroups,
          selectedRound: response.data.roundName[0].round_name,
          selectedDate: response.data.currentDate,
          selectedTime: transformTime(response.data.gameDayTime[0].time),
        });

        setLoaded(true);
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

  const transformTime = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  };

  let roundsOptions = [];
  for (let i = 0; i < gameDayData.rounds.length; i++) {
    const roundOption = gameDayData.rounds[i].round_name;
    roundsOptions = [...roundsOptions, roundOption];
  }

  let groupOptions = [];
  for (let i = 0; i < gameDayData.groups.length; i++) {
    const groupOption = gameDayData.groups[i].group_name;
    groupOptions = [...groupOptions, groupOption];
  }

  console.log(gameDayData);

  return (
    <>
      {loaded && (
        <Box sx={{ marginTop: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Button
              onClick={() => {
                handleDeleteGameDay(editGamedayId, editRoundId);
                handleDialogClose();
              }}
              variant="contained"
              endIcon={<DeleteIcon />}
            >
              Odstrániť hrací deň
            </Button>
          </Box>
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
              id={`groups-${editGamedayId}`}
              value={gameDayData.selectedGroups}
              options={groupOptions}
              getOptionLabel={(groupOption) => groupOption}
              renderInput={(params) => (
                <TextField {...params} label="Vyberte skupinu" />
              )}
              onChange={(event, newValue) => {
                setGameDayData({
                  ...gameDayData,
                  selectedGroups: newValue,
                });
              }}
              getOptionDisabled={(option) =>
                gameDayData.selectedGroups.some(
                  (selected) => selected === option
                )
              }
              sx={{ width: "100%", marginBottom: "1rem" }}
            />

            <Autocomplete
              freeSolo
              id={`rounds-${editGamedayId}`}
              options={roundsOptions}
              value={gameDayData.selectedRound}
              getOptionLabel={(roundOption) => roundOption}
              onChange={(event, newValue) => {
                setGameDayData({
                  ...gameDayData,
                  selectedRound: newValue,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Vyberte kolo" />
              )}
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
                value={dayjs(gameDayData.selectedDate)}
                onChange={(newValue) => {
                  setGameDayData({
                    ...gameDayData,
                    selectedDate: newValue,
                  });
                }}
                minDate={dayjs(new Date())}
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
                value={dayjs(gameDayData.selectedTime)}
                onChange={(newValue) => {
                  setGameDayData({
                    ...gameDayData,
                    selectedTime: newValue,
                  });
                }}
              />
            </LocalizationProvider>
          </Paper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              onClick={() => {
                console.log(editRoundId);
                handleEditGameDay(editGamedayId, editRoundId, gameDayData);
                handleDialogClose();
              }}
              variant="contained"
              endIcon={<EditIcon />}
            >
              Upraviť nastavenia
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
