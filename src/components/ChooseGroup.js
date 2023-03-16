import React, { useState } from "react";
import { SelectBox } from "../components/SelectBox";

import { DialogWindow } from "./DialogWindow";

import { Button, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const ChooseGroup = (props) => {
  const {
    checkedBoxes,
    groups,
    selectedGroup,
    handleGroupChange,
    handleMovePlayers,
  } = props;
  const [dialogState, setDialogState] = useState(false);

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ width: "100%", padding: "1rem" }}
        onClick={() => {
          handleDialogOpen();
        }}
      >{`Presunúť hráč${checkedBoxes.length > 1 ? "ov" : "a"}`}</Button>
      <DialogWindow open={dialogState} handleCloseModal={handleDialogClose}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleDialogClose}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
        <Typography sx={{ marginBottom: "2rem", marginTop: "1rem" }}>
          Vyberte skupinu, do ktorej sa majú presunúť hráči
        </Typography>
        <SelectBox
          id="select-group"
          labelContent="Vyberte skupinu"
          labelId="select-group-label"
          label="Vyberte skupinu"
          onChangeFunction={handleGroupChange}
          selectValue={selectedGroup}
          itemArray={groups}
        ></SelectBox>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
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
      </DialogWindow>
    </>
  );
};
