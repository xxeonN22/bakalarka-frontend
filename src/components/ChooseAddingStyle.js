import React from "react";
import { Grid, Paper, Tooltip } from "@mui/material";
import AddOnePlayerIcon from "../icons/AddOnePlayerIcon";
import AddMultiplePlayersIcon from "../icons/AddMultiplePlayersIcon";
import ImportPlayersIcon from "../icons/ImportPlayersIcon";

export const ChooseAddingStyle = (props) => {
  const { selectedStyle, handleStyleChange } = props;
  const addingStyles = [
    {
      name: "Pridať jedného hráča",
      value: "add-single-player",
      icon: <AddOnePlayerIcon width={40} height={40} fill={"black"} />,
      tooltip: "Zvoľte túto možnosť ak chcete pridať jedného hráča",
      tooltipPlacement: "top",
    },
    {
      name: "Pridať viacerých hráčov",
      value: "add-multiple-players",
      icon: <AddMultiplePlayersIcon width={40} height={40} fill={"black"} />,
      tooltip: "Zvoľte túto možnosť ak chcete pridať viacerých hráčov",
      tooltipPlacement: "top",
    },
    {
      name: "Import hráčov zo súboru",
      value: "import-players-from-file",
      icon: <ImportPlayersIcon width={40} height={40} fill={"black"} />,
      tooltip: "Zvoľte túto možnosť ak chcete pridať hráčov zo súboru .txt",
      tooltipPlacement: "bottom",
    },
  ];
  return (
    <Grid container spacing={2} justifyContent="center">
      {addingStyles.map((addingStyle) => (
        <Grid item xs={12} md={6} key={addingStyle.value}>
          <Tooltip
            arrow
            title={addingStyle.tooltip}
            placement={addingStyle.tooltipPlacement}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#3f51b5",
                  "& .MuiTooltip-arrow": {
                    color: "#3f51b5",
                  },
                },
              },
            }}
          >
            <Paper
              sx={{
                paddingBlock: "1rem",
                paddingInline: "1rem",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};
