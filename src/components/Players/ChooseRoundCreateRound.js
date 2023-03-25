import { Grid, Typography } from "@mui/material";

import { SelectRound } from "../../components/SelectBoxes/SelectRound";
import { RoundAction } from "../../components/RoundAction";

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
        lg={3}
        xl={2}
        sx={{ display: "flex", justifyContent: "flex-end", marginLeft: "auto" }}
      >
        <RoundAction buttonText="Upraviť kolo">
          <Typography>Cau</Typography>
        </RoundAction>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <RoundAction buttonText="Vytvoriť nové kolo">
          <Typography>Ahoj</Typography>
        </RoundAction>
      </Grid>
    </Grid>
  );
};
