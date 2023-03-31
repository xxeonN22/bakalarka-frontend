import { Box, Button } from "@mui/material";

export const ConfirmMoveButton = ({ handleDialogClose, handleMovePlayers }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        color="sunglow"
        variant="contained"
        sx={{ marginTop: "2rem" }}
        onClick={() => {
          handleMovePlayers();
          handleDialogClose();
        }}
      >
        Potvrdiť presunutie
      </Button>
    </Box>
  );
};
