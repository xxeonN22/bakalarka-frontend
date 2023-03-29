import { useNavigate } from "react-router-dom";
import { appTheme } from "../../themes/appTheme";

import { Grid, Checkbox, Typography } from "@mui/material";

export const PlayersDashboard = (props) => {
  const {
    playersData,
    tournamentId,
    checkedBoxes,
    handleCheck,
    handleChangeStatus,
    selectedRound,
    selectedGameDay,
    searchName,
    searchGroup,
  } = props;
  const navigate = useNavigate();

  return (
    <Grid container>
      {playersData &&
        playersData
          .filter(
            (player) =>
              player.first_name
                .toLowerCase()
                .includes(searchName.toLowerCase()) ||
              player.last_name.toLowerCase().includes(searchName.toLowerCase())
          )
          .filter((player) =>
            player.group_name
              .substring(player.group_name.length - 1)
              .toLowerCase()
              .includes(searchGroup.toLowerCase())
          )
          .map((player, index) => (
            <Grid
              item
              xs={12}
              key={player.id_player}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: index % 2 !== 0 ? "#303A53" : "#252E42",
                padding: "1rem",
                color: "white",
                textAlign: "center",
                [appTheme.breakpoints.down("md")]: {
                  paddingInline: "0.3rem",
                },
              }}
            >
              <Checkbox
                sx={{
                  color: "white",
                  padding: "0px",
                  flex: "1",
                  [appTheme.breakpoints.down("sm")]: { flex: "0" },
                }}
                onChange={() => handleCheck(player.id_player)}
                checked={checkedBoxes.includes(player.id_player)}
              ></Checkbox>
              <Typography
                sx={{
                  flex: "1",
                  [appTheme.breakpoints.down("md")]: { display: "none" },
                }}
              >
                {index + 1}
              </Typography>
              <Typography
                onClick={() =>
                  navigate(
                    `/tournaments/${tournamentId}/${player.id_player}/loggedIn`
                  )
                }
                sx={{
                  flex: "3",
                  textDecoration: "underline",
                  wordBreak: "break-all",
                  cursor: "pointer",
                  [appTheme.breakpoints.down("md")]: {
                    flex: "2",
                    marginInline: "0.4rem",
                  },
                }}
              >
                {player.first_name} {player.last_name}
              </Typography>
              <Typography sx={{ flex: "1" }}>{player.elo}</Typography>
              <Typography
                sx={{
                  flex: "2",
                  [appTheme.breakpoints.down("md")]: { flex: "1" },
                }}
              >
                {player.group_name.substring(player.group_name.length - 1)}
              </Typography>
              <Typography
                onClick={() => {
                  handleChangeStatus(
                    player.id_player,
                    player.status,
                    selectedRound,
                    selectedGameDay
                  );
                }}
                sx={{ flex: "1", cursor: "pointer" }}
              >
                {player.status}
              </Typography>
            </Grid>
          ))}
    </Grid>
  );
};
