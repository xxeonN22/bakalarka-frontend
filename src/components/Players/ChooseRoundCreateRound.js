import { Grid } from "@mui/material";

import { SelectRound } from "../../components/SelectBoxes/SelectRound";
import { NewRound } from "../../components/NewRound";

export const ChooseRoundCreateRound = (props) => {
  const { handleRoundChange, selectedRound, rounds } = props;
  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <SelectRound
          handleRoundChange={handleRoundChange}
          selectedRound={selectedRound}
          rounds={rounds}
        ></SelectRound>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={2.5}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <NewRound></NewRound>
      </Grid>
    </Grid>
  );
};
