import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { api } from "../axios/axios";

import { ContentNotLogged } from "../components/ContentNotLogged";
import { AuthenticationPageLink } from "../components/AuthenticationPageLink";
import { AlertMessage } from "../components/Alert/AlertMessage.js";
import { LoginTypography } from "../components/Typography/LoginTypography.js";
import { EmailField } from "../components/Authentication/EmailField.js";
import { PasswordField } from "../components/Authentication/PasswordField.js";
import { Rememberme } from "../components/Authentication/Rememberme.js";

import { Grid, Button, Container, Paper } from "@mui/material";

import {
  containerStyles,
  gridContainerStyle,
  gridItemStyle,
} from "../components/Login/LoginStyles";

import { schema } from "../validationSchemas/Login/validationSchema";
import { appTheme } from "../themes/appTheme";
const validationSchema = schema;

export const Login = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = document.cookie.includes("loggedIn=true");
    if (isLoggedIn) {
      navigate("/tournaments");
    }
  }, [navigate]);

  const handleLoginUser = async (userCredentials) => {
    try {
      const response = await api.post(`/login`, userCredentials);
      setResponseMessage(response.data);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/tournaments", { credentials: "include" });
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <ContentNotLogged setResponseMessage={setResponseMessage}>
        <Container maxWidth="md" sx={containerStyles}>
          <Paper
            sx={{
              backgroundColor: appTheme.palette.primary.main,
              color: "white",
            }}
          >
            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              onSubmit={(values) => handleLoginUser(values)}
              validationSchema={validationSchema}
            >
              {({ values, handleChange }) => (
                <Form>
                  {responseMessage && (
                    <AlertMessage
                      typeOfResponse={responseMessage.type}
                      responseMessage={responseMessage.message}
                      setResponseMessage={setResponseMessage}
                    ></AlertMessage>
                  )}
                  <Grid container sx={gridContainerStyle}>
                    <Grid item xs={12} sx={gridItemStyle}>
                      <LoginTypography></LoginTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <EmailField
                        name="email"
                        label="Zadajte email"
                      ></EmailField>
                    </Grid>
                    <Grid item xs={12}>
                      <PasswordField
                        name="password"
                        label="Zadajte heslo"
                      ></PasswordField>
                    </Grid>
                    <Grid item xs={12} sx={gridItemStyle}>
                      <AuthenticationPageLink
                        text="Ešte nemáte účet?"
                        to="/register"
                        boldText="Zaregistrujte sa"
                      ></AuthenticationPageLink>
                    </Grid>
                    <Grid item xs={12} md={6} sx={gridItemStyle}>
                      <Rememberme
                        values={values}
                        handleChange={handleChange}
                      ></Rememberme>
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
                        color="sunglow"
                        sx={{ padding: "1rem" }}
                        variant="contained"
                        type="submit"
                      >
                        Prihlásiť sa
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Container>
      </ContentNotLogged>
    </>
  );
};
