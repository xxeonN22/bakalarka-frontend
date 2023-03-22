import { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { api } from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { appTheme } from "../themes/appTheme";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { EmailTextField } from "../components/EmailTextField";

import {
  Typography,
  Grid,
  Button,
  Paper,
  Container,
  Alert,
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
    paddingInline: "2rem",
  },
};

const gridItemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email musí byť zadaný")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Neplatný tvar emailovej adresy"
    ),
});

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
              initialValues={{ email: "", password: "", rememberMe: false }}
              onSubmit={(values) => handleResetPassword(values)}
              validationSchema={validationSchema}
            >
              {({ values, handleChange, errors, touched, handleBlur }) => (
                <Form>
                  {responseMessage && (
                    <Alert
                      sx={{ marginBlock: "1rem" }}
                      severity={
                        responseMessage.type === "success" ? "success" : "error"
                      }
                      onClose={() => {
                        setResponseMessage(null);
                      }}
                    >
                      {responseMessage.message}
                    </Alert>
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
                      <EmailTextField
                        id="email"
                        label="Zadajte email"
                        name="email"
                        value={values.email}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      ></EmailTextField>
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
