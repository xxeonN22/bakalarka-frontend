import { useEffect, useState } from "react";
import { appTheme } from "../themes/appTheme";
import { useNavigate } from "react-router-dom";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { ShowPasswordTextField } from "../components/ShowPasswordTextField";
import { EmailTextField } from "../components/EmailTextField";
import { AuthenticationPageLink } from "../components/AuthenticationPageLink";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { api } from "../axios/axios";

import {
  Typography,
  Grid,
  Button,
  Checkbox,
  Container,
  Paper,
  Alert,
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

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email musí byť zadaný")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Neplatný tvar emailovej adresy"
    ),
  password: yup
    .string()
    .required("Heslo musí byť zadané")
    .min(8, "Heslo musí obsahovať aspoň 8 znakov")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Heslo musí obsahovať aspoň jedno veľké písmeno a jedno číslo"
    ),
  rememberMe: yup.boolean(),
});

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
      <ContentNotLogged>
        <Container maxWidth="md" sx={containerStyles}>
          <Paper>
            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              onSubmit={(values) => handleLoginUser(values)}
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
                        Prihlásenie používateľa
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
                    <Grid item xs={12}>
                      <ShowPasswordTextField
                        id="password"
                        label="Zadajte heslo"
                        name="password"
                        value={values.password}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
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
                        id="rememberMe"
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
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
