import React from "react";
import { Grid, Alert } from "@mui/material";

import { addStylesArray } from "./addStylesArray";
import { AddingStyle } from "./AddingStyle";

export const ChooseAddingStyle = (props) => {
  const {
    selectedStyle,
    handleStyleChange,
    stepperMessage,
    setStepperMessage,
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
