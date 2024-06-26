import { api } from "../axios/axios";
import { appTheme } from "../themes/appTheme";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";

import { Table } from "../components/Table/Table";
import { AlertMessage } from "../components/Alert/AlertMessage.js";
import { SelectGroup } from "../components/SelectBoxes/SelectGroup";
import { SelectRound } from "../components/SelectBoxes/SelectRound";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { TournamentInfoData } from "../components/TournamentInfoData";
import { TournamentProfileMatches } from "../components/TournamentProfileMatches";

const boxStyle = {
  width: "100%",
  maxWidth: "85%",
  marginTop: "2rem",
  [appTheme.breakpoints.down("md")]: {
    maxWidth: "95%",
  },
};

export const TournamentProfile = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const { id: tournamentId } = useParams();

  const [tableData, setTableData] = useState([]);
  const [tableDataLoaded, setTableDataLoaded] = useState(false);

  const [tournamentName, setTournamentName] = useState("");

  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [tournamentData, setTournamentData] = useState({
    groups: [],
    selectedGroup: "",
    rounds: [],
    selectedRound: "",
    matches: [],
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(
          `/searchtournament/${tournamentId}/data`
        );
        setTournamentName(response.data.tournamentName);
        setAdminData({
          firstName: response.data.adminData[0].first_name,
          lastName: response.data.adminData[0].last_name,
          email: response.data.adminData[0].email,
        });
      } catch (error) {
        if (error.response) {
          setResponseMessage(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    })();
  }, [tournamentId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(
          `/searchtournament/${tournamentId}/matches`
        );
        setTournamentData((tournamentData) => ({
          ...tournamentData,
          groups: response.data.groups,
          selectedGroup: response.data.groups[0].group_name,
          rounds: response.data.rounds,
          selectedRound: response.data.rounds[0].round_number,
          matches: response.data.matchPair,
        }));
        setDataLoaded(true);
      } catch (error) {
        if (error.response) {
          setResponseMessage(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    })();
  }, [tournamentId]);

  useEffect(() => {
    (async () => {
      if (tournamentData.selectedGroup && tournamentData.selectedRound) {
        try {
          const response = await api.get(
            `/table/tournament/${tournamentId}/${tournamentData.selectedGroup}/${tournamentData.selectedRound}`
          );
          setTableData(response.data);
          setTableDataLoaded(true);
        } catch (error) {
          if (error.response) {
            setResponseMessage(error.response.data);
          } else {
            console.log(`Error: ${error.message}`);
          }
        }
      }
    })();
  }, [
    tournamentId,
    tournamentData.selectedGroup,
    tournamentData.selectedRound,
  ]);

  const handleGroupChange = (event) => {
    setTournamentData({
      ...tournamentData,
      selectedGroup: event.target.value,
    });
  };

  const handleRoundChange = (event) => {
    setTournamentData({
      ...tournamentData,
      selectedRound: event.target.value,
    });
  };

  return (
    <ContentNotLogged
      backGround="white"
      position="flex-start"
      setResponseMessage={setResponseMessage}
    >
      {dataLoaded && (
        <Box sx={boxStyle}>
          <TournamentInfoData
            adminData={adminData}
            tournamentName={tournamentName}
          ></TournamentInfoData>
          {responseMessage && (
            <AlertMessage
              typeOfResponse={responseMessage.type}
              responseMessage={responseMessage.message}
              setResponseMessage={setResponseMessage}
            ></AlertMessage>
          )}
          <TournamentProfileMatches
            tournamentData={tournamentData}
          ></TournamentProfileMatches>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "2rem",
              [appTheme.breakpoints.up("md")]: {
                justifyContent: "space-between",
              },
            }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <SelectGroup
                handleGroupChange={handleGroupChange}
                selectedGroup={tournamentData.selectedGroup}
                groups={tournamentData.groups}
              ></SelectGroup>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectRound
                handleRoundChange={handleRoundChange}
                selectedRound={tournamentData.selectedRound}
                rounds={tournamentData.rounds}
              ></SelectRound>
            </Grid>
          </Grid>
          <Box sx={{ marginBlock: "2rem" }}>
            {tableDataLoaded && (
              <Table
                tableData={tableData}
                status="loggedOff"
                tournamentId={tournamentId}
              ></Table>
            )}
          </Box>
        </Box>
      )}
    </ContentNotLogged>
  );
};
