import React from "react";

import { Alert, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const DeleteTournament = (props) => {
  const { tournamentName, handleCloseModal, handleClose } = props;
  return (
    <>
      <Alert
        severity="error"
        sx={{
          marginTop: "1.5rem",
          width: "400px",
          fontSize: "1rem",
          lineHeight: "1.6rem",
        }}
      >
        Naozaj chcete vymazať turnaj {tournamentName}? Tento krok sa nebude dať
        vrátiť späť a zmeny budú trvalé!
      </Alert>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBlock: "1.5rem",
        }}
      >
        <Button variant="contained" color="error">
          Vymazať turnaj
        </Button>
      </Box>
      <IconButton
        onClick={() => {
          handleCloseModal();
          handleClose();
        }}
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        <CloseIcon></CloseIcon>
      </IconButton>
    </>
  );
};
