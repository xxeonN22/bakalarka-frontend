import React from "react";
import { Grid, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { addStylesArray } from "./addStylesArray";
import { AddingStyle } from "./AddingStyle";

export const ChooseAddingStyle = (props) => {
  const {
    selectedStyle,
    handleStyleChange,
    stepperMessage,
    setStepperMessage,
    handleCloseModal,
    handleClose,
  } = props;

  const addingStyles = addStylesArray();

  return (
    <>
      {stepperMessage.selectAddMethodMessage && (
        <Alert
          sx={{ marginBlock: "1rem" }}
          severity={"error"}
          onClose={() => {
            setStepperMessage({
              ...stepperMessage,
              selectAddMethodMessage: null,
            });
          }}
        >
          {stepperMessage.selectAddMethodMessage}
        </Alert>
      )}
      <IconButton
        onClick={() => {
          handleCloseModal();
          handleClose();
        }}
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        <CloseIcon color="primary"></CloseIcon>
      </IconButton>
      <Grid container spacing={2} justifyContent="center">
        {addingStyles.map((addingStyle) => (
          <AddingStyle
            key={addingStyle.value}
            addingStyle={addingStyle}
            selectedStyle={selectedStyle}
            handleStyleChange={handleStyleChange}
          ></AddingStyle>
        ))}
      </Grid>
    </>
  );
};
