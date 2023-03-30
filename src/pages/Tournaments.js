import { useState, useEffect } from "react";
import { appTheme } from "../themes/appTheme";
import { useNavigate } from "react-router-dom";
import { api } from "../axios/axios";

import { Grid, Fab, IconButton } from "@mui/material";

import { ContentLayout } from "../components/ContentLayout";
import { CreateTournament } from "../components/Tournaments/CreateTournament";
import { AlertMessage } from "../components/Alert/AlertMessage.js";
import { TournamentData } from "../components/Tournaments/TournamentData";
import { TournamentSearchBar } from "../components/Tournaments/TournamentSearchBar";
import { TournamentsTypography } from "../components/Typography/TournamentsTypography";
import { DialogWindow } from "../components/DialogWindow";
import { EditUserProfile } from "../components/EditUserProfile";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";

const gridContainerStyle = {
  rowGap: "5rem",
  [appTheme.breakpoints.down("sm")]: {
    rowGap: "2rem",
  },
};

export const Tournaments = () => {
  const navigate = useNavigate();
  const [tournamentData, setTournamentData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [dialogState, setDialogState] = useState(false);

  const filteredData = tournamentData.filter((data) =>
    data.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/tournaments`);
        setTournamentData(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
          return;
        }
        if (error.response) {
          setResponseMessage(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    })();
  }, [navigate]);

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
  };

  return (
    <>
      <ContentLayout screen={"tournaments"}>
        <Grid container sx={gridContainerStyle}>
          <TournamentsTypography></TournamentsTypography>
          <CreateTournament
            setResponseMessage={setResponseMessage}
            responseMessage={responseMessage}
            setTournamentData={setTournamentData}
          ></CreateTournament>

          <TournamentSearchBar
            filteredData={filteredData}
            searchText={searchText}
            setSearchText={setSearchText}
          ></TournamentSearchBar>
        </Grid>

        {responseMessage && (
          <AlertMessage
            typeOfResponse={responseMessage.type}
            responseMessage={responseMessage.message}
            setResponseMessage={setResponseMessage}
          ></AlertMessage>
        )}

        <TournamentData
          filteredData={filteredData}
          setTournamentData={setTournamentData}
          tournamentData={tournamentData}
          setResponseMessage={setResponseMessage}
        ></TournamentData>
        <Fab
          color="primary"
          aria-label="settings"
          size="small"
          onClick={() => handleDialogOpen()}
          sx={{
            backgroundColor: "#FCCE36",
            color: "#1f2736",
            "&:hover": {
              backgroundColor: "#1f2736",
              color: "#FCCE36",
            },
            position: "fixed",
            bottom: 10,
            right: 5,
            [appTheme.breakpoints.down("md")]: { display: "none" },
          }}
        >
          <SettingsOutlinedIcon />
        </Fab>
        <DialogWindow open={dialogState} handleCloseModal={handleDialogClose}>
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleDialogClose}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <EditUserProfile
            setResponseMessage={setResponseMessage}
            handleDialogClose={handleDialogClose}
          ></EditUserProfile>
        </DialogWindow>
      </ContentLayout>
    </>
  );
};
