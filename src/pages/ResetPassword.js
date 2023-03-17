import { useState } from "react";
import { appTheme } from "../themes/appTheme";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { EmailTextField } from "../components/EmailTextField";

import { Typography, Grid, Button, Paper, Container } from "@mui/material";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "90vh",
  [appTheme.breakpoints.down("md")]: {
    paddingInline: "5rem",
  },
  [appTheme.breakpoints.down("sm")]: {
    paddingInline: "2rem",
  },
};

const gridContainerStyle = {
  paddingBlock: "2rem",
  rowGap: "2rem",
  [appTheme.breakpoints.up("md")]: {
    paddingInline: "10rem",
  },
  [appTheme.breakpoints.up("xs")]: {
    paddingInline: "2rem",
  },
};

const gridItemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  return (
    <>
      <ContentNotLogged>
        <Container maxWidth="md" sx={containerStyle}>
          <Paper>
            <Grid container sx={gridContainerStyle}>
              <Grid item xs={12} sx={gridItemStyle}>
                <Typography
                  variant="h2"
                  fontSize="1.5rem"
                  textTransform="uppercase"
                  letterSpacing="0.2rem"
                >
                  Obnova hesla
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <EmailTextField
                  id="email"
                  label="Zadajte email"
                  setFormData={setFormData}
                  formData={formData}
                ></EmailTextField>
              </Grid>
              <Grid item xs={12} sx={gridItemStyle}>
                <Button
                  variant="contained"
                  onClick={() => console.log(formData)}
                >
                  Obnoviť heslo
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ContentNotLogged>
    </>
  );
};
