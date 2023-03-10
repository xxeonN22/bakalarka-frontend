import React, { useState, useEffect } from "react";
import { Box, Input, Grid, TextField, MenuItem } from "@mui/material";

export const NewPlayerData = (props) => {
  const [playerInfo, setPlayerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    group: "",
    elo: "",
  });

  const groups = [
    {
      id: 1,
      value: "SKUPINA - A",
    },
    {
      id: 2,
      value: "SKUPINA - B",
    },
    {
      id: 3,
      value: "SKUPINA - C",
    },
  ];

  const handleFirstNameChange = (event) => {
    setPlayerInfo({ ...playerInfo, firstName: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setPlayerInfo({ ...playerInfo, lastName: event.target.value });
  };

  const handleEmailChange = (event) => {
    setPlayerInfo({ ...playerInfo, email: event.target.value });
  };

  const handleGroupChange = (event) => {
    setPlayerInfo({ ...playerInfo, group: event.target.value });
  };

  const handleEloChange = (event) => {
    setPlayerInfo({ ...playerInfo, elo: event.target.value });
  };

  useEffect(() => {
    console.log(playerInfo);
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const { selectedStyle } = props;
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  console.log(selectedFile);
  return (
    <>
      {selectedStyle === "add-single-player" && (
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={handleFirstNameChange}
              value={playerInfo.firstName}
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
              onChange={handleLastNameChange}
              value={playerInfo.lastName}
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
              onChange={handleEmailChange}
              value={playerInfo.email}
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
              value={playerInfo.group}
              onChange={handleGroupChange}
              multiple // Add the multiple prop
              fullWidth
              margin="normal"
              required
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.value}>
                  {group.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={handleEloChange}
              value={playerInfo.elo}
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
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Pridať viacero hráčov"
          multiline
          rows={15}
          inputProps={{ cols: 50 }}
          placeholder="meno;priezvisko;email;skupina;elo;"
        />
      )}
      {selectedStyle === "import-players-from-file" && (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Input type="file" onChange={handleFileChange} />
        </Box>
      )}
    </>
  );
};
