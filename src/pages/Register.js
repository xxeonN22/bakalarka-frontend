import { useState } from "react";
import { appTheme } from "../themes/appTheme";
import { useNavigate } from "react-router-dom";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { ShowPasswordTextField } from "../components/ShowPasswordTextField";
import { AuthenticationPageLink } from "../components/AuthenticationPageLink";
import { EmailTextField } from "../components/EmailTextField";
import { Formik, Form } from "formik";
import * as yup from "yup";

import {
  TextField,
  Typography,
  Grid,
  Button,
  Container,
  Paper,
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
    paddingInline: "1rem",
  },
};

const gridItemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .matches(
      /^[A-Z][a-zA-Z]{2,}$/,
      "Krstné meno musí začínať veľkým písmenom, musí mať aspoň 3 znaky a môže obsahovať len písmená abecedy"
    )
    .required("Meno musí byť vyplnené"),
  lastName: yup
    .string()
    .matches(
      /^[A-Z][a-zA-Z]{2,}$/,
      "Priezvisko musí začínať veľkým písmenom, musí mať aspoň 3 znaky a môže obsahovať len písmená abecedy"
    )
    .required("Meno musí byť vyplnené"),
  email: yup
    .string()
    .required("Email musí byť vyplnený")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Neplatný tvar emailovej adresy"
    ),
  password: yup
    .string()
    .required("Heslo musí byť vyplnené")
    .min(8, "Heslo musí obsahovať aspoň 8 znakov")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Heslo musí obsahovať aspoň jedno veľké písmeno a jedno číslo"
    ),
  repeatPassword: yup
    .string()
    .required("Heslo musíte potvrdiť")
    .oneOf([yup.ref("password")], "Heslá sa nezhodujú"),
});

export const Register = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterUser = async (userCredentials) => {
    const response = await fetch(`http://localhost:3000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCredentials,
      }),
    });
    const data = await response.json();
    setResponseMessage(data);
    if (response.status === 200) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };
  return (
    <>
      <ContentNotLogged>
        <Container maxWidth="md" sx={containerStyle}>
          <Paper>
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
                        id="firstName"
                        name="firstName"
                        label="Zadajte meno"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        sx={{ width: "100%" }}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="lastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        label="Zadajte priezvisko"
                        sx={{ width: "100%" }}
                      ></TextField>
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
                    <Grid item xs={12}>
                      <ShowPasswordTextField
                        id="repeatPassword"
                        label="Zadajte heslo"
                        name="repeatPassword"
                        value={values.repeatPassword}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        error={
                          touched.repeatPassword &&
                          Boolean(errors.repeatPassword)
                        }
                        helperText={
                          touched.repeatPassword && errors.repeatPassword
                        }
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
