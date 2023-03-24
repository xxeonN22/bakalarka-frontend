import { Box, Typography } from "@mui/material";

export const Table = ({ tableData }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#1f2736",
        color: "white",
        borderRadius: "5px",
      }}
    >
      {tableData &&
        tableData.map((data, index) => {
          return (
            <Box
              key={data.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingBlock: "1.2rem",
                backgroundColor: index % 2 === 0 ? "#2e3650" : "",
              }}
            >
              <Typography sx={{ flex: "1", textAlign: "center" }}>
                {index + 1}.
              </Typography>
              <Typography sx={{ flex: "3", textAlign: "center" }}>
                {data.name}
              </Typography>
              <Typography sx={{ flex: "1", textAlign: "center" }}>
                {data.elo}
              </Typography>
              <Typography sx={{ flex: "1", textAlign: "center" }}>
                {data?.pointsWon ?? 0}:{data?.pointsLost ?? 0}
              </Typography>
              <Typography sx={{ flex: "1", textAlign: "center" }}>
                {data?.setsWon ?? 0}:{data?.setsLost ?? 0}
              </Typography>
            </Box>
          );
        })}
    </Box>
  );
};
