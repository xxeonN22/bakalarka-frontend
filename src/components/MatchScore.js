import { appTheme } from "../themes/appTheme";
import { DialogWindow } from "./DialogWindow";

import { Grid, Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const MatchScore = (props) => {
  const {
    dialogState,
    handleDialogClose,
    setsToRender,
    firstPlayer,
    secondPlayer,
    handleSetScore,
    buttonText,
  } = props;

  return (
    <DialogWindow
      open={dialogState ?? false}
      handleCloseModal={handleDialogClose}
      sx={{ position: "relative" }}
    >
      <IconButton
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={() => handleDialogClose()}
      >
        <CloseIcon></CloseIcon>
      </IconButton>
      <Box>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingBlock: "2rem",
            }}
          >
            <Typography
              sx={{
                width: "200px",
                textAlign: "center",
                wordWrap: "break-word",
                [appTheme.breakpoints.down("md")]: {
                  textAlign: "left",
                },
              }}
            >
              {firstPlayer}
            </Typography>
            <Typography
              sx={{
                width: "200px",
                textAlign: "center",
                wordWrap: "break-word",
                [appTheme.breakpoints.down("md")]: {
                  textAlign: "right",
                },
              }}
            >
              {secondPlayer}
            </Typography>
          </Grid>
          {setsToRender}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleSetScore();
                handleDialogClose();
              }}
            >
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </DialogWindow>
  );
};
