import { appTheme } from "../../themes/appTheme.js";
import { Typography } from "@mui/material";

export const PlayerProfileTypography = (props) => {
  const { playerData } = props;
  return (
    <Typography
      variant="h2"
      fontSize="1.4rem"
      sx={{
        letterSpacing: "0.1rem",
        [appTheme.breakpoints.down("md")]: { textAlign: "center" },
      }}
    >
      História zápasov hráča{" "}
      <span style={{ fontWeight: "500" }}>
        {playerData.first_name} {playerData.last_name}
      </span>
    </Typography>
  );
};
