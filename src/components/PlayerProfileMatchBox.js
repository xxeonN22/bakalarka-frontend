import useMediaQuery from "@mui/material/useMediaQuery";
import { appTheme } from "../themes/appTheme";
import { Box, Typography, Button } from "@mui/material";

export const PlayerProfileMatchBox = (props) => {
  const { match, handleShowScore } = props;
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        marginBlock: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#303a53",
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
        variant="contained"
        onClick={() => handleShowScore(match.matchId)}
        sx={{ flex: 1 }}
      >
        {isTabletSize ? "Skóre" : "Zobraziť skóre"}
      </Button>
      <Typography textAlign="center" sx={{ wordBreak: "break-all", flex: 2 }}>
        {match.secondPlayerData[0].first_name}{" "}
        {match.secondPlayerData[0].last_name}
      </Typography>
    </Box>
  );
};
