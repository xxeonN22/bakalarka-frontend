import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { appTheme } from "../../themes/appTheme";

export const Table = ({ tableData, status, tournamentId }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: appTheme.palette.primary.dark,
        color: "white",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBlock: "1.2rem",
          backgroundColor: appTheme.palette.primary.main,
        }}
      >
        <Typography sx={{ flex: "1", textAlign: "center" }}>Poradie</Typography>
        <Typography sx={{ flex: "3", textAlign: "center" }}>Meno</Typography>
        <Typography sx={{ flex: "1", textAlign: "center" }}>ELO</Typography>
        <Typography sx={{ flex: "1", textAlign: "center" }}>Skóre</Typography>
        <Typography
          sx={{
            flex: "1",
            textAlign: "center",
            [appTheme.breakpoints.down("sm")]: { display: "none" },
          }}
        >
          V:P
        </Typography>
        <Typography sx={{ flex: "1", textAlign: "center" }}>Body</Typography>
      </Box>
      {tableData &&
        tableData.map((data, index) => {
          return (
            <Box
              key={data.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingBlock: "1.2rem",
                transition: "background-color 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: appTheme.palette.sunglow.main,
                  color: appTheme.palette.primary.main,
                },
                backgroundColor:
                  index % 2 === 0 ? "" : appTheme.palette.primary.main,
              }}
            >
              <Typography sx={{ flex: "1", textAlign: "center" }}>
                {index + 1}.
              </Typography>
              <Typography
                sx={{
                  flex: "3",
                  textAlign: "center",
                  wordBreak: "break-all",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() =>
                  navigate(`/tournaments/${tournamentId}/${data.id}/${status}`)
                }
              >
                {data.name}
              </Typography>
              <Typography sx={{ flex: "1", textAlign: "center" }}>
                {data.elo}
              </Typography>
              <Typography sx={{ flex: "1", textAlign: "center" }}>
                {data?.pointsWon ?? 0}:{data?.pointsLost ?? 0}
              </Typography>
              <Typography
                sx={{
                  flex: "1",
                  textAlign: "center",
                  [appTheme.breakpoints.down("sm")]: { display: "none" },
                }}
              >
                {data?.setsWon ?? 0}:{data?.setsLost ?? 0}
              </Typography>
              <Typography sx={{ flex: "1", textAlign: "center" }}>
                {data?.setsWon}
              </Typography>
            </Box>
          );
        })}
    </Box>
  );
};
