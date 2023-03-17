import { useState } from "react";
import { appTheme } from "../themes/appTheme";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { ShowPasswordTextField } from "../components/ShowPasswordTextField";
import { EmailTextField } from "../components/EmailTextField";
import { AuthenticationPageLink } from "../components/AuthenticationPageLink";

import {
  Typography,
  Grid,
  Button,
  Checkbox,
  Container,
  Paper,
} from "@mui/material";

const containerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
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

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <ContentNotLogged>
        <Container maxWidth="md" sx={containerStyles}>
          <Paper>
            <Grid container sx={gridContainerStyle}>
              <Grid item xs={12} sx={gridItemStyle}>
                <Typography
                  variant="h2"
                  fontSize="1.5rem"
                  textTransform="uppercase"
                  letterSpacing="0.2rem"
                >
                  Prihlásenie používateľa
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
              <Grid item xs={12}>
                <ShowPasswordTextField
                  id="password"
                  label="Zadajte heslo"
                  setFormData={setFormData}
                  formData={formData}
                ></ShowPasswordTextField>
              </Grid>
              <Grid item xs={12} sx={gridItemStyle}>
                <AuthenticationPageLink
                  text="Ešte nemáte účet?"
                  to="/register"
                  boldText="Zaregistrujte sa"
                ></AuthenticationPageLink>
              </Grid>
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <Checkbox
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      rememberMe: event.target.checked,
                    })
                  }
                ></Checkbox>
                <Typography variant="h2" fontSize="0.875rem">
                  Zapamätať prihlásenie
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <AuthenticationPageLink
                  text="Zabudli ste heslo?"
                  to="/resetpassword"
                  boldText="Obnoviť heslo"
                ></AuthenticationPageLink>
              </Grid>
              <Grid item xs={12} sx={gridItemStyle}>
                <Button
                  sx={{ padding: "1rem" }}
                  variant="contained"
                  onClick={handleLogin}
                >
                  Prihlásiť sa
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ContentNotLogged>
    </>
  );
};
