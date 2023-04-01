import { appTheme } from "../themes/appTheme";
import { Fab } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const FloatingActionButton = ({ handleDialogOpen }) => {
  return (
    <Fab
      color="primary"
      aria-label="settings"
      size="small"
      onClick={() => handleDialogOpen()}
      sx={{
        backgroundColor: "#FCCE36",
        color: "#1f2736",
        "&:hover": {
          backgroundColor: "#1f2736",
          color: "#FCCE36",
        },
        position: "fixed",
        bottom: 10,
        right: 5,
        [appTheme.breakpoints.down("md")]: { display: "none" },
      }}
    >
      <SettingsOutlinedIcon></SettingsOutlinedIcon>
    </Fab>
  );
};
