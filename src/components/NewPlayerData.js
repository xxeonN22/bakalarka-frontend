import { useEffect, useState } from "react";
import { api } from "../axios/axios";
import {
  Box,
  Input,
  Grid,
  TextField,
  MenuItem,
  Alert,
  Typography,
  Paper,
} from "@mui/material";

export const NewPlayerData = (props) => {
  const {
    tournamentId,
    selectedStyle,
    stepperMessage,
    setStepperMessage,
    newPlayerData,
    handleSinglePlayerChange,
    handleMultiplePlayersChange,
    handleFileChange,
  } = props;

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(
          `/tournaments/addplayers/${tournamentId}`
        );
        setGroups(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    })();
  }, [tournamentId]);

  return (
    <>
      {stepperMessage.playersCredentialsMessage && (
        <Alert
          sx={{ marginBlock: "1rem" }}
          severity={"error"}
          onClose={() => {
            setStepperMessage({
              ...stepperMessage,
              playersCredentialsMessage: null,
            });
          }}
        >
          {stepperMessage.playersCredentialsMessage}
        </Alert>
      )}
      {selectedStyle === "add-single-player" && (
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) =>
                handleSinglePlayerChange("firstName", e.target.value)
              }
              value={newPlayerData.firstName}
              label="Zadajte krstné meno"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                inputProps: {
                  pattern: "[A-Za-z]+",
                  title: "Prosím, zadajte len písmená abecedy",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) =>
                handleSinglePlayerChange("lastName", e.target.value)
              }
              value={newPlayerData.lastName}
              label="Zadajte priezvisko"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                inputProps: {
                  pattern: "[A-Za-z]+",
                  title: "Prosím, zadajte len písmená abecedy",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) =>
                handleSinglePlayerChange("email", e.target.value)
              }
              value={newPlayerData.email}
              label="Zadajte email"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                inputProps: {
                  pattern: "[A-Za-z]+",
                  title: "Prosím, zadajte len písmená abecedy",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Vyberte skupinu"
              value={newPlayerData.group}
              onChange={(e) =>
                handleSinglePlayerChange("group", e.target.value)
              }
              multiple // Add the multiple prop
              fullWidth
              margin="normal"
              required
            >
              {groups.map((group) => (
                <MenuItem key={group.group_name} value={group.group_name}>
                  {group.group_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handleSinglePlayerChange("elo", e.target.value)}
              value={newPlayerData.elo}
              label="Zadajte hodnotu ELO"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                inputProps: {
                  pattern: "[0-9]*",
                  title: "Prosím, zadajte len numerickú hodnotu",
                },
              }}
            />
          </Grid>
        </Grid>
      )}
      {selectedStyle === "add-multiple-players" && (
        <>
          <Grid container>
            <Grid
              item
              xs={12}
              textAlign="center"
              sx={{ marginBottom: "0.4rem" }}
            >
              Zoznam vaších skupín
            </Grid>
            <Grid
              container
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
              spacing={2}
            >
              {groups.map((group) => (
                <Grid key={group.group_name} item xs={4}>
                  <Paper sx={{ padding: "0.3rem" }}>
                    <Typography sx={{ textAlign: "center" }}>
                      {group.group_name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Typography textAlign="center" sx={{ marginBottom: "0.5rem" }}>
            Každý hráč musí byť zadaný v nasledujúcom tvare:
          </Typography>
          <Typography textAlign="center" sx={{ marginBottom: "0.5rem" }}>
            Meno, Priezvisko, email, SKUPINA - ?, elo;
          </Typography>
          <TextField
            onChange={(e) => handleMultiplePlayersChange(e)}
            fullWidth
            id="outlined-multiline-static"
            label="Pridať viacero hráčov"
            multiline
            rows={15}
            inputProps={{ cols: 50 }}
            placeholder="Meno,Priezvisko,email,SKUPINA - ?,elo;"
          />
        </>
      )}
      {selectedStyle === "import-players-from-file" && (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              textAlign="center"
              sx={{ marginBottom: "0.4rem" }}
            >
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
                  <Paper sx={{ padding: "0.3rem" }}>
                    <Typography sx={{ textAlign: "center" }}>
                      {group.group_name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Typography textAlign="center" sx={{ marginBottom: "0.5rem" }}>
            Každý riadok v súbore .csv musí byť v tvare:
          </Typography>
          <Typography textAlign="center" sx={{ marginBottom: "0.5rem" }}>
            Meno, Priezvisko, email, SKUPINA - ?, elo kde každá hodnota je jedna
            bunka
          </Typography>
          <Input
            sx={{ marginTop: "2rem" }}
            type="file"
            inputProps={{ accept: "text/csv" }}
            onChange={(e) => handleFileChange(e)}
          />
        </Box>
      )}
    </>
  );
};
