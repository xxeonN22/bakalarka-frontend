import { useEffect, useState } from "react";
import { appTheme } from "../themes/appTheme";
import { useParams } from "react-router-dom";
import { ContentLayout } from "../components/ContentLayout";
import { SelectBox } from "../components/SelectBox";

import { Grid } from "@mui/material";

export const TournamentTable = () => {
  const { tournamentId } = useParams();

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}/table`
      );
      const data = await response.json();
      setGroups(data.groups);
      setSelectedGroup(data.groups[0].group_name);
      setRounds(data.rounds);
      setSelectedRound(data.rounds[0].round_number);
    })();
  }, [tournamentId]);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  return (
    <>
      <ContentLayout>
        <Grid
          container
          spacing={2}
          sx={{
            [appTheme.breakpoints.down("md")]: {
              justifyContent: "space-between",
            },
          }}
        >
          <Grid item xs={6} md={4} lg={3}>
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
          <Grid item xs={6} md={4} lg={3}>
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
      </ContentLayout>
    </>
  );
};
