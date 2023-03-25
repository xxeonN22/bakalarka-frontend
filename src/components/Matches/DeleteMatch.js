import { appTheme } from "../../themes/appTheme";
import { Button } from "@mui/material";

export const DeleteMatch = (props) => {
  const { selectedMatches, handleDeleteButtonClick } = props;
  return (
    <Button
      variant="contained"
      sx={{
        paddingBlock: "1rem",
        [appTheme.breakpoints.down("md")]: {
          width: "50%",
        },
      }}
      color="error"
      onClick={handleDeleteButtonClick}
    >
      {selectedMatches.length === 1 ? `Vymazať zápas` : `Vymazať zápasy`}
    </Button>
  );
};
