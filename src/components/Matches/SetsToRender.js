import { Grid } from "@mui/material";
import { TextFieldIncrement } from "../TextFieldIncrement";

export const SetsToRender = (props) => {
  const { setNumber, matchValues, maxPoints, handleInputChange } = props;
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
        value={matchValues[setNumber]?.firstPlayerSet}
        functionName={(value) =>
          handleInputChange(
            { target: { name: `firstPlayer-set${setNumber}`, value } },
            setNumber
          )
        }
        label={`Set ${setNumber}`}
        id={`firstPlayer-set${setNumber}`}
        max={maxPoints}
      />
      <TextFieldIncrement
        value={matchValues[setNumber]?.firstPlayerSet}
        functionName={(value) =>
          handleInputChange(
            { target: { name: `secondPlayer-set${setNumber}`, value } },
            setNumber
          )
        }
        label={`Set ${setNumber}`}
        id={`secondPlayer-set${setNumber}`}
        max={maxPoints}
      />
    </Grid>
  );
};
