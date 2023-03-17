import React from "react";
import {
  Breadcrumbs,
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { appTheme } from "../themes/appTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { ContentLayout } from "../components/ContentLayout";

export const PlayerProfile = () => {
  const navigate = useNavigate();
  const { tournamentId } = useParams();
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));
  return (
    <>
      <ContentLayout>
        <Breadcrumbs aria-label="breadcrumb">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              onClick={() => navigate(`/tournaments/${tournamentId}`)}
            >
              Hráči
            </Link>
            <Typography color="text.primary">Samuel Tuka</Typography>
          </Breadcrumbs>
        </Breadcrumbs>

        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12} md={6}>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="player-credentials"
                id="player-credentials-header"
                sx={{ textAlign: "center" }}
              >
                <Typography>Upraviť údaje hráča</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth />
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    sx={{ marginTop: "1rem" }}
                    startIcon={<EditOutlinedIcon />}
                  >
                    Potvrdiť úpravu údajov
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={6}>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="player-stats"
                id="player-stats-header"
                sx={{ textAlign: "center" }}
              >
                <Typography>
                  Účasť hráča v jednotlivých hracích dňoch
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item xs={6}>
                    a
                  </Grid>
                  <Grid item xs={6}>
                    b
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "4rem" }}>
          <Typography
            variant="h2"
            fontSize="1.4rem"
            sx={{ letterSpacing: "0.1rem" }}
          >
            História zápasov hráča{" "}
            <span style={{ fontWeight: "500" }}>TUKA Samuel</span>
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "2rem",
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
                left: 0,
              },
            }}
          >
            Kurt 1
          </Typography>
          <Typography
            textAlign="center"
            sx={{ wordBreak: "break-all", flex: 2 }}
          >
            Samuel Tuka
          </Typography>
          <Button variant="contained" sx={{ flex: 1 }}>
            {isTabletSize ? "Skóre" : "Zobraziť skóre"}
          </Button>
          <Typography
            textAlign="center"
            sx={{ wordBreak: "break-all", flex: 2 }}
          >
            Samuel Tuka
          </Typography>
        </Box>
      </ContentLayout>
    </>
  );
};
