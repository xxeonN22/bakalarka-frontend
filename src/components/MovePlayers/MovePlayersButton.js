import { Button } from "@mui/material";

export const MovePlayersButton = ({ handleDialogOpen, checkedBoxes }) => {
  return (
    <Button
      variant="contained"
      sx={{ width: "100%", padding: "1rem" }}
      onClick={() => {
        handleDialogOpen();
      }}
    >{`Presunúť hráč${checkedBoxes.length > 1 ? "ov" : "a"}`}</Button>
  );
};
