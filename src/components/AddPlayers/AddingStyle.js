import { appTheme } from "../../themes/appTheme";
import React from "react";
import { Grid, Paper } from "@mui/material";

const paperStyle = (selectedStyle, addingStyle) => {
  return {
    paddingBlock: "1rem",
    paddingInline: "1rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "190px",
    backgroundColor:
      selectedStyle === addingStyle.value
        ? appTheme.palette.primary.main
        : "inherit",
    transition: "background-color 0.5s ease",
    color: selectedStyle === addingStyle.value ? "white" : "inherit",
  };
};

export const AddingStyle = (props) => {
  const { addingStyle, selectedStyle, handleStyleChange } = props;
  return (
    <Grid item xs={12} sm={6} xl={4}>
      <Paper sx={paperStyle(selectedStyle, addingStyle)}>
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
            fill:
              selectedStyle === addingStyle.value
                ? "white"
                : appTheme.palette.primary.main,
          })}
          <span
            style={{
              marginTop: "0.5rem",
              color:
                selectedStyle === addingStyle.value
                  ? "white"
                  : appTheme.palette.primary.main,
            }}
          >
            {addingStyle.name}
          </span>
        </label>
      </Paper>
    </Grid>
  );
};
