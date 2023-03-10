import { appTheme } from "../themes/appTheme";

import { Box, Button, Paper, Checkbox, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export const MatchBox = (props) => {
  const isTabletSize = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const { match, handleButtonClick, handleCheckboxClick } = props;

  const matchId = match[0];
  const court = match[1];
  const player1 = match[2][0];
  const player2 = match[3][0];

  const firstPlayer = `${player1.first_name} ${player1.last_name}`;
  const firstPlayerElo = player1.elo;
  const firstPlayerId = player1.id_player;
  const secondPlayer = `${player2.first_name} ${player2.last_name}`;
  const secondPlayerElo = player2.elo;
  const secondPlayerId = player2.id_player;

  return (
    <Paper sx={{ marginBlock: "0.5rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "#303A53",
          color: "white",
          borderRadius: "4px",
          [appTheme.breakpoints.down("md")]: {
            position: "relative",
          },
        }}
      >
        <Checkbox
          sx={{ padding: "0", color: "white", flex: 1 }}
          onClick={() => handleCheckboxClick(matchId)}
        ></Checkbox>
        <Typography
          variant="body2"
          sx={{
            flex: 1,
            textAlign: "center",
            [appTheme.breakpoints.down("md")]: {
              position: "absolute",
              top: 0,
              left: 10,
            },
          }}
        >
          {court}
        </Typography>
        <Typography
          variant="h2"
          fontSize="1.15rem"
          sx={{
            flex: 1,
            textAlign: "center",
            [appTheme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          {firstPlayerElo}
        </Typography>
        <Typography
          sx={{
            flex: 3,
            textAlign: "center",
            maxWidth: "35%",
            wordWrap: "break-word",
            paddingInline: "1rem",
          }}
        >
          {firstPlayer}
        </Typography>
        <Button
          variant="contained"
          sx={{ flex: 1 }}
          onClick={(event) =>
            handleButtonClick(
              matchId,
              firstPlayer,
              secondPlayer,
              firstPlayerElo,
              secondPlayerElo,
              firstPlayerId,
              secondPlayerId
            )
          }
        >
          {isTabletSize ? "Skore" : "Zapísať skore"}
        </Button>
        <Typography
          sx={{
            flex: 3,
            textAlign: "center",
            maxWidth: "30%",
            wordWrap: "break-word",
            paddingInline: "1rem",
          }}
        >
          {secondPlayer}
        </Typography>
        <Typography
          variant="h2"
          fontSize="1.15rem"
          sx={{
            flex: 1,
            textAlign: "center",
            [appTheme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          {secondPlayerElo}
        </Typography>
      </Box>
    </Paper>
  );
};
