import { useState } from "react";
import { appTheme } from "../themes/appTheme";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { ShowPasswordTextField } from "../components/ShowPasswordTextField";
import { AuthenticationPageLink } from "../components/AuthenticationPageLink";
import { EmailTextField } from "../components/EmailTextField";

import {
  TextField,
  Typography,
  Grid,
  Button,
  Container,
  Paper,
} from "@mui/material";

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
    paddingInline: "1rem",
  },
};

const gridItemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(await response.json());
  };

  return (
    <>
      <ContentNotLogged>
        <Container maxWidth="md" sx={containerStyle}>
          <Paper>
            <Grid container sx={gridContainerStyle}>
              <Grid item xs={12} sx={gridItemStyle}>
                <Typography
                  variant="h2"
                  textTransform="uppercase"
                  sx={{
                    fontSize: "1.5rem",
                    letterSpacing: "0.2rem",
                    [appTheme.breakpoints.down("md")]: {
                      fontSize: "1.1rem",
                      letterSpacing: "0.1rem",
                    },
                  }}
                >
                  Registrácia používateľa
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="user-firstname"
                  label="Zadajte meno"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      firstName: event.target.value,
                    })
                  }
                  sx={{ width: "100%" }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="user-lastname"
                  label="Zadajte priezvisko"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      lastName: event.target.value,
                    })
                  }
                  sx={{ width: "100%" }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <EmailTextField
                  id="email"
                  label="Zadajte email"
                  setFormData={setFormData}
                  formData={formData}
                ></EmailTextField>
              </Grid>
              <Grid item xs={12}>
                <ShowPasswordTextField
                  id="password"
                  label="Zadajte heslo"
                  setFormData={setFormData}
                  formData={formData}
                ></ShowPasswordTextField>
              </Grid>
              <Grid item xs={12}>
                <ShowPasswordTextField
                  id="repeatPassword"
                  label="Zadajte heslo znovu"
                  setFormData={setFormData}
                  formData={formData}
                ></ShowPasswordTextField>
              </Grid>
              <Grid item xs={12} md={12} sx={gridItemStyle}>
                <AuthenticationPageLink
                  text="Už máte účet?"
                  to="/login"
                  boldText="Prihláste sa"
                ></AuthenticationPageLink>
              </Grid>
              <Grid item xs={12} sx={gridItemStyle}>
                <Button
                  sx={{ padding: "1rem" }}
                  variant="contained"
                  onClick={handleRegister}
                >
                  Registrovať sa
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ContentNotLogged>
    </>
  );
};
