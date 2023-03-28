import { Grid } from "@mui/material";
import { TextFieldIncrement } from "./TextFieldIncrement";

export const PlayerProfileSetsToRender = ({
  firstPlayerPoints,
  secondPlayerPoints,
  setNumber,
  handleInputChange,
  max,
}) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        gap: "1rem",
      }}
    >
      <TextFieldIncrement
        value={firstPlayerPoints}
        label={`Set ${setNumber + 1}`}
        id={`firstPlayer-set${setNumber + 1}`}
        max={max}
        functionName={(value) =>
          handleInputChange(setNumber, value, "points_won")
        }
      />
      <TextFieldIncrement
        value={secondPlayerPoints}
        label={`Set ${setNumber + 1}`}
        id={`firstPlayer-set${setNumber + 1}`}
        max={max}
        functionName={(value) =>
          handleInputChange(setNumber, value, "points_lost")
        }
      />
    </Grid>
  );
};
