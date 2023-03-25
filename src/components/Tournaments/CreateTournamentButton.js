import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  gridItemStyle,
  createTournamentStyle,
} from "./CreateTournamentButtonStyles";

export const CreateTournamentButton = ({ handleDialogOpen }) => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} sx={gridItemStyle}>
      <Button
        startIcon={<AddIcon></AddIcon>}
        onClick={() => {
          handleDialogOpen();
        }}
        sx={createTournamentStyle}
        variant="contained"
      >
        Vytvoriť turnaj
      </Button>
    </Grid>
  );
};
