import React, { useState } from "react";

import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { SelectGroup } from "../SelectBoxes/SelectGroup";
import { DialogWindow } from "../DialogWindow";
import { MovePlayersButton } from "./MovePlayersButton";
import { ConfirmMoveButton } from "./ConfirmMoveButton";

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
      <MovePlayersButton
        handleDialogOpen={handleDialogOpen}
        checkedBoxes={checkedBoxes}
      ></MovePlayersButton>
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
        <SelectGroup
          handleGroupChange={handleGroupChange}
          selectedGroup={selectedGroup}
          groups={groups}
        ></SelectGroup>
        <ConfirmMoveButton
          handleDialogClose={handleDialogClose}
          handleMovePlayers={handleMovePlayers}
        ></ConfirmMoveButton>
      </DialogWindow>
    </>
  );
};
