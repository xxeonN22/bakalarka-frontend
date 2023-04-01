import { useState } from "react";
import { appTheme } from "../themes/appTheme";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { api } from "../axios/axios";

import { Grid, Button, Container, Paper } from "@mui/material";

import { ContentNotLogged } from "../components/ContentNotLogged";
import { AuthenticationPageLink } from "../components/AuthenticationPageLink";
import { EmailField } from "../components/Authentication/EmailField";
import { PasswordField } from "../components/Authentication/PasswordField";
import { FormikTextField } from "../components/FormikTextField";
import { RegisterTypography } from "../components/Typography/RegisterTypography";
import { AlertMessage } from "../components/Alert/AlertMessage";

import {
  containerStyle,
  gridContainerStyle,
  gridItemStyle,
} from "../components/Register/registerStyles";

import { schema } from "../validationSchemas/Register/validationSchema";
const validationSchema = schema;

export const Register = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterUser = async (userCredentials) => {
    try {
      const response = await api.post(`/register`, userCredentials);
      setResponseMessage(response.data);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/login");
        }, 4000);
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
      <ContentNotLogged>
        <Container maxWidth="md" sx={containerStyle}>
          <Paper
            sx={{
              backgroundColor: appTheme.palette.primary.main,
              color: "white",
            }}
          >
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                repeatPassword: "",
              }}
              onSubmit={(values) => handleRegisterUser(values)}
              validationSchema={validationSchema}
            >
              {() => (
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
                      <RegisterTypography></RegisterTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormikTextField
                        name="firstName"
                        label="Zadajte krstné meno"
                        color="white"
                      ></FormikTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormikTextField
                        name="lastName"
                        label="Zadajte priezvisko"
                        color="white"
                      ></FormikTextField>
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
                    <Grid item xs={12}>
                      <PasswordField
                        name="repeatPassword"
                        label="Zopakujte heslo"
                      ></PasswordField>
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
                        color="sunglow"
                        sx={{ padding: "1rem" }}
                        variant="contained"
                        type="submit"
                      >
                        Registrovať sa
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
