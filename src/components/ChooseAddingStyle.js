import React from "react";
import { Grid, Paper, Alert } from "@mui/material";
import AddOnePlayerIcon from "../icons/AddOnePlayerIcon";
import AddMultiplePlayersIcon from "../icons/AddMultiplePlayersIcon";
import ImportPlayersIcon from "../icons/ImportPlayersIcon";

export const ChooseAddingStyle = (props) => {
  const {
    selectedStyle,
    handleStyleChange,
    stepperMessage,
    setStepperMessage,
  } = props;
  const addingStyles = [
    {
      name: "Pridať jedného hráča",
      value: "add-single-player",
      icon: <AddOnePlayerIcon width={40} height={40} fill={"black"} />,
    },
    {
      name: "Pridať viacerých hráčov",
      value: "add-multiple-players",
      icon: <AddMultiplePlayersIcon width={40} height={40} fill={"black"} />,
    },
    {
      name: "Import hráčov zo súboru .csv",
      value: "import-players-from-file",
      icon: <ImportPlayersIcon width={40} height={40} fill={"black"} />,
    },
  ];
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
          <Grid item xs={12} sm={6} xl={4} key={addingStyle.value}>
            <Paper
              sx={{
                paddingBlock: "1rem",
                paddingInline: "1rem",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "190px",
                backgroundColor:
                  selectedStyle === addingStyle.value ? "#3f51b5" : "inherit",
                transition: "background-color 0.5s ease",
                color:
                  selectedStyle === addingStyle.value ? "white" : "inherit",
              }}
            >
              <label
                className="chooseAddingStyle"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  textAlign: "center",
                  width: "100%",
                }}
                htmlFor={addingStyle.value}
              >
                <input
                  style={{ display: "none" }}
                  checked={selectedStyle === addingStyle.value}
                  onChange={handleStyleChange}
                  type="radio"
                  id={addingStyle.value}
                  name="radio-buttons-add-style"
                  value={addingStyle.value}
                />
                {React.cloneElement(addingStyle.icon, {
                  width: 40,
                  height: 40,
                  fill: selectedStyle === addingStyle.value ? "white" : "black",
                })}
                <span style={{ marginTop: "0.5rem" }}>{addingStyle.name}</span>
              </label>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
