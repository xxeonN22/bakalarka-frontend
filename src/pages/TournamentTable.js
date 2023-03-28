import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../axios/axios";

import { Grid } from "@mui/material";

import { ContentLayout } from "../components/ContentLayout";
import { Table } from "../components/Table/Table";
import { SelectRound } from "../components/SelectBoxes/SelectRound";
import { SelectGroup } from "../components/SelectBoxes/SelectGroup";

export const TournamentTable = () => {
  const { tournamentId } = useParams();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/table/tournament/${tournamentId}`);
        setGroups(response.data.tournamentGroups);
        setSelectedGroup(response.data.tournamentGroups[0].group_name);
        setRounds(response.data.tournamentRounds);
        setSelectedRound(response.data.tournamentRounds[0].round_number);
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
  }, [tournamentId]);

  useEffect(() => {
    (async () => {
      if (selectedGroup && selectedRound) {
        try {
          const response = await api.get(
            `/table/tournament/${tournamentId}/${selectedGroup}/${selectedRound}`
          );
          setTableData(response.data);
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
      }
    })();
  }, [tournamentId, selectedGroup, selectedRound]);

  return (
    <>
      <ContentLayout>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginBottom: "4rem" }}
        >
          <Grid item xs={6} sm={6} md={4} lg={3} xl={2.3}>
            <SelectGroup
              handleGroupChange={handleGroupChange}
              selectedGroup={selectedGroup}
              groups={groups}
            ></SelectGroup>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3} xl={2.3}>
            <SelectRound
              handleRoundChange={handleRoundChange}
              selectedRound={selectedRound}
              rounds={rounds}
            ></SelectRound>
          </Grid>
        </Grid>
        <Table tableData={tableData}></Table>
      </ContentLayout>
    </>
  );
};
