import { useState, useEffect } from "react";
import { ContentLayout } from "../components/ContentLayout";
import { appTheme } from "../themes/appTheme";

import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { Tournament } from "../components/Tournament";
import { CreateTournament } from "../components/CreateTournament";

export const Tournaments = () => {
  const [tournamentData, setTournamentData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => setTournamentData(data));
  }, []);

  const [searchText, setSearchText] = useState("");
  const filteredData = tournamentData.filter((data) =>
    data.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleClearClick = () => {
    setSearchText("");
  };

  return (
    <>
      <ContentLayout screen={"tournaments"}>
        <Grid container rowGap={10}>
          <Grid item xs={12} lg={8}>
            <Typography
              variant="h2"
              fontSize="1.5rem"
              sx={{
                width: "60%",
                [appTheme.breakpoints.down("lg")]: {
                  textAlign: "center",
                  width: "100%",
                },
              }}
            >
              Vytvorte turnaj vo vašom obľubenom športe a nenechajte sa rušiť
              pri jeho{" "}
              <span style={{ borderBottom: "3px solid white" }}>
                organizácii.
              </span>
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              alignItems: "center",
              [appTheme.breakpoints.up("md")]: {
                justifyContent: "flex-start",
              },
              [appTheme.breakpoints.up("lg")]: {
                justifyContent: "flex-end",
              },
            }}
          >
            <CreateTournament
              typeOfContent={"createTournament"}
            ></CreateTournament>
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              [appTheme.breakpoints.up("lg")]: {
                justifyContent: "center",
              },
            }}
          >
            <Autocomplete
              sx={{
                width: "50%",
                [appTheme.breakpoints.down("lg")]: {
                  width: "90%",
                },
              }}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={filteredData.map((data) => data.name)}
              value={searchText}
              onInputChange={(event, newValue) => {
                setSearchText(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                  placeholder="Vyhľadať turnaj"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                    endAdornment: (
                      <>
                        {searchText && (
                          <InputAdornment
                            position="end"
                            onClick={handleClearClick}
                            sx={{ cursor: "pointer" }}
                          >
                            <ClearIcon />
                          </InputAdornment>
                        )}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "5rem" }} spacing={2}>
          {filteredData.map((data) => (
            <Tournament
              key={data.id_tournament}
              tournamentId={data.id_tournament}
              name={data.name}
              playersNumber={data.players_count}
            />
          ))}
        </Grid>
      </ContentLayout>
    </>
  );
};
