import { useState } from "react";
import { Formik, Form } from "formik";
import { api } from "../axios/axios";
import { useParams, useNavigate } from "react-router-dom";

import { Paper, Container, Grid } from "@mui/material";

import {
  containerStyle,
  gridContainerStyle,
} from "../components/NewPassword/newPasswordStyles";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { PasswordField } from "../components/Authentication/PasswordField.js";
import { AlertMessage } from "../components/Alert/AlertMessage.js";
import { NewPasswordTypography } from "../components/NewPassword/NewPasswordTypography";
import { NewPasswordButton } from "../components/NewPassword/NewPasswordButton";

import { schema } from "../validationSchemas/NewPassword/validationSchema";
const validationSchema = schema;

export const NewPassword = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const { hash } = useParams();

  const handleNewPassword = async (userCredentials) => {
    try {
      const response = await api.put(`/newpassword/${hash}`, userCredentials);
      setResponseMessage(response.data);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/login", { credentials: "include" });
        }, 2000);
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
          <Formik
            initialValues={{ password: "", repeatPassword: "" }}
            onSubmit={(values) => handleNewPassword(values)}
            validationSchema={validationSchema}
          >
            {() => (
              <Form>
                <Paper>
                  <Grid container sx={gridContainerStyle}>
                    <NewPasswordTypography></NewPasswordTypography>

                    <Grid item xs={12}>
                      {responseMessage && (
                        <AlertMessage
                          typeOfResponse={responseMessage.type}
                          responseMessage={responseMessage.message}
                          setResponseMessage={setResponseMessage}
                        ></AlertMessage>
                      )}
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
                    <NewPasswordButton></NewPasswordButton>
                  </Grid>
                </Paper>
              </Form>
            )}
          </Formik>
        </Container>
      </ContentNotLogged>
    </>
  );
};
