import useMediaQuery from "@mui/material/useMediaQuery";
import { appTheme } from "../themes/appTheme";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { DialogWindow } from "./DialogWindow";
import CloseIcon from "@mui/icons-material/Close";
import { PlayerProfileMatchScore } from "./PlayerProfileMatchScore";

export const PlayerProfileMatchBox = (props) => {
  const {
    match,
    tournamentId,
    playerId,
    setResponseMessage,
    handleEditScore,
    status,
  } = props;
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));
  const [dialogState, setDialogState] = useState(false);

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
  };

  return (
    <Box
      sx={{
        marginBlock: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: appTheme.palette.primary.main,
        padding: "1rem",
        color: "white",
        position: "relative",
      }}
    >
      <Typography
        textAlign="center"
        sx={{
          flex: 1,
          [appTheme.breakpoints.down("md")]: {
            position: "absolute",
            top: 0,
            left: 10,
          },
        }}
      >
        {match.courtName}
      </Typography>
      <Typography textAlign="center" sx={{ wordBreak: "break-all", flex: 2 }}>
        {match.firstPlayerData[0].first_name}{" "}
        {match.firstPlayerData[0].last_name}
      </Typography>
      <Button
        color="sunglow"
        variant="contained"
        onClick={() => {
          handleDialogOpen();
        }}
        sx={{ flex: 1 }}
      >
        {isTabletSize ? "Skóre" : "Zobraziť skóre"}
      </Button>

      <DialogWindow open={dialogState} handleCloseModal={handleDialogClose}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleDialogClose}
        >
          <CloseIcon color="primary"></CloseIcon>
        </IconButton>
        <PlayerProfileMatchScore
          matchId={match.matchId}
          playerId={playerId}
          tournamentId={tournamentId}
          handleDialogClose={handleDialogClose}
          setResponseMessage={setResponseMessage}
          handleEditScore={handleEditScore}
          status={status}
        ></PlayerProfileMatchScore>
      </DialogWindow>

      <Typography textAlign="center" sx={{ wordBreak: "break-all", flex: 2 }}>
        {match.secondPlayerData[0].first_name}{" "}
        {match.secondPlayerData[0].last_name}
      </Typography>
    </Box>
  );
};
