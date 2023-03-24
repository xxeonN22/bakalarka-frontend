import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";

const boxStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "1rem",
};

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={boxStyle}>
      <Box
        sx={{
          display: "flex",
          gap: "4rem",
        }}
      >
        <Typography fontSize="4rem">4</Typography>
        <Typography fontSize="4rem">0</Typography>
        <Typography fontSize="4rem">4</Typography>
      </Box>
      <Typography sx={{ fontSize: "2rem" }}>
        Stránka, ktorú ste zadali, neexistuje!
      </Typography>
      <Typography sx={{ fontSize: "1rem" }}>
        Prosím, kliknite na tlačidlo nižšie, ktoré Vás presmeruje na domovskú
        stránku
      </Typography>
      <Button
        variant="contained"
        sx={{ paddingBlock: "1rem", paddingInline: "2rem", marginTop: "2rem" }}
        onClick={() => navigate("/tournaments")}
      >
        Domovská stránka
      </Button>
    </Box>
  );
};
