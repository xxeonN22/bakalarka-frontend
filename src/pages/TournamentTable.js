import { useEffect, useState } from "react";
import { appTheme } from "../themes/appTheme";
import { useParams } from "react-router-dom";
import { ContentLayout } from "../components/ContentLayout";
import { SelectBox } from "../components/SelectBox";

import { Box, Typography, Grid } from "@mui/material";

export const TournamentTable = () => {
  const { tournamentId } = useParams();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/table/tournament/${tournamentId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setGroups(data.tournamentGroups);
      setSelectedGroup(data.tournamentGroups[0].group_name);
      setRounds(data.tournamentRounds);
      setSelectedRound(data.tournamentRounds[0].round_number);
    })();
  }, [tournamentId]);

  useEffect(() => {
    (async () => {
      if (selectedGroup && selectedRound) {
        const response = await fetch(
          `http://localhost:3000/table/tournament/${tournamentId}/${selectedGroup}/${selectedRound}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setTableData(data);
      }
    })();
  }, [tournamentId, selectedGroup, selectedRound]);

  console.log(tableData);
  return (
    <>
      <ContentLayout>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginBottom: "4rem" }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.3}>
            <SelectBox
              id="select-group"
              labelContent="Vyberte skupinu"
              labelId="select-group-label"
              label="Vyberte skupinu"
              onChangeFunction={handleGroupChange}
              selectValue={selectedGroup}
              itemArray={groups}
            ></SelectBox>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.3}>
            <SelectBox
              id="select-round"
              labelContent="Vyberte kolo"
              labelId="select-round-label"
              label="Vyberte kolo"
              onChangeFunction={handleRoundChange}
              selectValue={selectedRound}
              itemArray={rounds}
            ></SelectBox>
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundColor: "#1f2736",
            color: "white",
            borderRadius: "5px",
          }}
        >
          {tableData &&
            tableData.map((data, index) => {
              return (
                <Box
                  key={data.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBlock: "1.2rem",
                    backgroundColor: index % 2 === 0 ? "#2e3650" : "",
                  }}
                >
                  <Typography sx={{ flex: "1", textAlign: "center" }}>
                    {index + 1}.
                  </Typography>
                  <Typography sx={{ flex: "3", textAlign: "center" }}>
                    {data.name}
                  </Typography>
                  <Typography sx={{ flex: "1", textAlign: "center" }}>
                    {data.elo}
                  </Typography>
                  <Typography sx={{ flex: "1", textAlign: "center" }}>
                    {data?.pointsWon ?? 0}:{data?.pointsLost ?? 0}
                  </Typography>
                  <Typography sx={{ flex: "1", textAlign: "center" }}>
                    {data?.setsWon ?? 0}:{data?.setsLost ?? 0}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </ContentLayout>
    </>
  );
};
