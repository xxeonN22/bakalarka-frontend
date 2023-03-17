import moment from "moment";
import "moment-timezone";

import { Popover, Paper, Typography, Box } from "@mui/material";

export const ConfirmationChanges = (props) => {
  const {
    handleClosePopover,
    id,
    open,
    anchorEl,
    confirmationChanges,
    transformDate,
  } = props;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={(e) => handleClosePopover(e)}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Paper sx={{ padding: "1rem" }}>
        <Typography>Posledné zmeny</Typography>
        {confirmationChanges.map((change) => {
          const utcTime = moment.utc(change.date_time);
          const cetTime = utcTime.tz("Europe/Paris");
          const cetTimeStr = cetTime.format("HH:mm");
          return (
            <Box sx={{ textAlign: "center" }} key={change.date_time}>
              {transformDate(change.date_time)} {cetTimeStr}
            </Box>
          );
        })}
      </Paper>
    </Popover>
  );
};
