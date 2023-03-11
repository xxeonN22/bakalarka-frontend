import { useEffect, useState } from "react";
import { TextFieldIncrement } from "./TextFieldIncrement";
import {
  TextField,
  Grid,
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

export const EditTournamentSettings = ({
  tournamentId,
  sportType,
  handleClose,
  handleCloseModal,
  handleEditTournament,
}) => {
  const [loading, setLoading] = useState(true);
  const sportsWithSets = ["badminton", "volejbal", "tenis", "stolny-tenis"];
  const maxNumberPointsSports = ["badminton", "volejbal"];
  const [tournamentData, setTournamentData] = useState({
    tournamentId: tournamentId,
    tournamentName: "",
    maxSets: 0,
    maxPoints: 0,
    numberOfRounds: 0,
    numberOfGroups: 0,
    numberOfCourts: 0,
    sportType: "",
    pairingSystem: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/eddittournament/${tournamentId}`
      );
      const data = await response.json();
      setTournamentData({
        tournamentName: data[0].name,
        maxSets: data[0].max_sets,
        maxPoints: data[0].max_points,
        numberOfCourts: data[3].courts,
        numberOfGroups: data[1].groups,
        numberOfRounds: data[2].rounds,
        sportType: data[0].sport_type,
        pairingSystem: data[0].pairing_system,
      });
      setLoading(false);
    };
    fetchData();
  }, [tournamentId]);

  const handleTournamentSettingsChange = (name, value) => {
    setTournamentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <IconButton
        onClick={() => {
          handleCloseModal();
          handleClose();
        }}
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        <CloseIcon></CloseIcon>
      </IconButton>
      <Typography
        variant="h2"
        sx={{
          fontSize: "1.25rem",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        {`Upraviť údaje pre turnaj ${tournamentData.tournamentName}`}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Názov turnaja"
            value={tournamentData.tournamentName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              handleTournamentSettingsChange("tournamentName", e.target.value)
            }
          />
        </Grid>
        {sportsWithSets.includes(sportType) && (
          <Grid item xs={12} md={6}>
            <TextFieldIncrement
              isRequired={true}
              value={tournamentData.maxSets}
              functionName={(value) =>
                handleTournamentSettingsChange("maxSets", value)
              }
              label={`Počet setov v zápase`}
              id={`tournament-max-sets`}
              min={1}
              max={10}
            ></TextFieldIncrement>
          </Grid>
        )}
        {maxNumberPointsSports.includes(sportType) && (
          <Grid item xs={12} md={6}>
            <TextFieldIncrement
              isRequired={true}
              value={tournamentData.maxPoints}
              functionName={(value) =>
                handleTournamentSettingsChange("maxPoints", value)
              }
              label={`Počet bodov v sete`}
              id={`tournament-max-points`}
              min={1}
              max={100}
            ></TextFieldIncrement>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <TextFieldIncrement
            isRequired={true}
            value={tournamentData.numberOfCourts}
            functionName={(value) =>
              handleTournamentSettingsChange("numberOfCourts", value)
            }
            label={`Počet kurtov`}
            id={`tournament-courts`}
            min={1}
            max={20}
          ></TextFieldIncrement>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldIncrement
            isRequired={true}
            value={tournamentData.numberOfGroups}
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
            value={tournamentData.numberOfRounds}
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
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button
          startIcon={<EditIcon></EditIcon>}
          variant="contained"
          onClick={() => {
            handleEditTournament(tournamentData);
            handleCloseModal();
            handleClose();
          }}
        >
          Potvrdiť úpravu údajov
        </Button>
      </Box>
    </>
  );
};
