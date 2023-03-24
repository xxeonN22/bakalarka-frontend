import { useNavigate } from "react-router-dom";

import { Breadcrumbs, Link, Typography } from "@mui/material";

export const PlayerProfileCrumbs = (props) => {
  const { tournamentId, playerData } = props;
  const navigate = useNavigate();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          sx={{ cursor: "pointer" }}
          underline="hover"
          onClick={() => navigate(`/tournaments/${tournamentId}`)}
        >
          Hráči
        </Link>
        <Typography color="text.primary">
          {playerData.first_name} {playerData.last_name}
        </Typography>
      </Breadcrumbs>
    </Breadcrumbs>
  );
};
