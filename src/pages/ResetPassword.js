import { useState } from "react";
import { Formik, Form } from "formik";
import { api } from "../axios/axios";
import { useNavigate } from "react-router-dom";

import { Typography, Grid, Button, Paper, Container } from "@mui/material";

import {
  containerStyle,
  gridContainerStyle,
  gridItemStyle,
} from "../components/ResetPassword/resetPasswordStyles";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { EmailField } from "../components/Authentication/EmailField";
import { AlertMessage } from "../components/Alert/AlertMessage";
import { schema } from "../validationSchemas/ResetPassword/validationSchema.js";
const validationSchema = schema;

export const ResetPassword = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (userCredentials) => {
    try {
      const response = await api.post(`/resetpassword`, userCredentials);
      setResponseMessage(response.data);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/login", { credentials: "include" });
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
      <ContentNotLogged>
        <Container maxWidth="md" sx={containerStyle}>
          <Paper>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema}
            >
              {(values) => (
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
                      <EmailField
                        name="email"
                        label="Zadajte email"
                      ></EmailField>
                    </Grid>
                    <Grid item xs={12} sx={gridItemStyle}>
                      <Button variant="contained">Obnoviť heslo</Button>
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
