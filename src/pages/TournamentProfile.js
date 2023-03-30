import { api } from "../axios/axios";
import { appTheme } from "../themes/appTheme";
import { useParams } from "react-router-dom";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { useEffect, useState } from "react";
import { SelectGroup } from "../components/SelectBoxes/SelectGroup";
import { SelectRound } from "../components/SelectBoxes/SelectRound";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMediaQuery } from "@mui/material";
import { Table } from "../components/Table/Table";
import { AlertMessage } from "../components/Alert/AlertMessage.js";

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
            console.log(error.response.data);
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

  console.log(tournamentName);
  console.log(adminData);

  return (
    <ContentNotLogged
      backGround="white"
      position="flex-start"
      setResponseMessage={setResponseMessage}
    >
      {dataLoaded && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "85%",
            marginTop: "2rem",
            [appTheme.breakpoints.down("md")]: {
              maxWidth: "95%",
            },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: "2rem",
              [appTheme.breakpoints.down("md")]: { textAlign: "center" },
            }}
          >
            <Grid item xs={12} sm={6} lg={4}>
              <Typography
                variant="h2"
                fontSize="1.2rem"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Názov turnaja:{" "}
                <span
                  style={{
                    fontWeight: "500",
                    marginLeft: "0.5rem",
                    fontSize: "1.5rem",
                  }}
                >
                  {tournamentName}
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                [appTheme.breakpoints.down("lg")]: {
                  justifyContent: "flex-end",
                },
                [appTheme.breakpoints.down("sm")]: {
                  justifyContent: "center",
                },
              }}
            >
              <Typography variant="h2" fontSize="1.1rem">
                Organizátor: {adminData.firstName} {adminData.lastName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{
                justifyContent: "right",
                display: "flex",
                alignItems: "center",
                [appTheme.breakpoints.down("lg")]: {
                  justifyContent: "center",
                },
              }}
            >
              <Typography variant="h2" fontSize="1.1rem">
                Kontakt: {adminData.email}
              </Typography>
            </Grid>
          </Grid>
          {responseMessage && (
            <AlertMessage
              typeOfResponse={responseMessage.type}
              responseMessage={responseMessage.message}
              setResponseMessage={setResponseMessage}
            ></AlertMessage>
          )}
          <Accordion
            sx={{
              width: "100%",
              background: appTheme.palette.primary.main,
              color: "white",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="sunglow" />}
              aria-controls="player-credentials"
              id="player-credentials-header"
              sx={{ textAlign: "center" }}
            >
              <Typography>Aktuálne zápasy, ktoré sú na programe</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {tournamentData.matches.map((match, index) => (
                  <Grid item xs={12} key={match[0]}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor:
                          index % 2 === 0
                            ? appTheme.palette.primary.dark
                            : appTheme.palette.primary.main,
                        color: "white",
                        padding: "1rem",
                        borderRadius: "4px",
                        [appTheme.breakpoints.down("md")]: {
                          position: "relative",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          flex: 1,
                          textAlign: "center",
                          [appTheme.breakpoints.down("md")]: {
                            position: "absolute",
                            top: 0,
                            left: 10,
                          },
                        }}
                      >
                        {match[1]}
                      </Typography>
                      <Typography
                        variant="h2"
                        fontSize="1.15rem"
                        sx={{
                          flex: 1,
                          textAlign: "center",
                          [appTheme.breakpoints.down("md")]: {
                            display: "none",
                          },
                        }}
                      >
                        {match[2][0].elo}
                      </Typography>
                      <Typography
                        sx={{
                          flex: 3,
                          textAlign: "center",
                          maxWidth: "35%",
                          wordWrap: "break-word",
                          paddingInline: "1rem",
                        }}
                      >
                        {match[2][0].first_name} {match[2][0].last_name}
                      </Typography>
                      <Typography
                        sx={{
                          flex: 3,
                          textAlign: "center",
                          maxWidth: "30%",
                          wordWrap: "break-word",
                          paddingInline: "1rem",
                        }}
                      >
                        {match[3][0].first_name} {match[3][0].last_name}
                      </Typography>
                      <Typography
                        variant="h2"
                        fontSize="1.15rem"
                        sx={{
                          flex: 1,
                          textAlign: "center",
                          [appTheme.breakpoints.down("md")]: {
                            display: "none",
                          },
                        }}
                      >
                        {match[3][0].elo}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
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
