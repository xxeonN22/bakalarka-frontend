import React, { useState } from "react";
import { Link } from "react-router-dom";
import { appTheme } from "../themes/appTheme";
import { ContentNotLogged } from "../components/ContentNotLogged";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  TextField,
  Typography,
  Grid,
  Button,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
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
        <Container
          maxWidth="md"
          sx={{
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
          }}
        >
          <Box sx={{ bgcolor: "white" }}>
            <Grid
              container
              sx={{
                paddingBlock: "2rem",
                rowGap: "2rem",
                [appTheme.breakpoints.up("md")]: {
                  paddingInline: "10rem",
                },
                [appTheme.breakpoints.up("xs")]: {
                  paddingInline: "2rem",
                },
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
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
                <TextField
                  required
                  name="user-email"
                  id="user-email"
                  label="Zadajte email"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      email: event.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: "100%" }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="user-password"
                  id="user-password"
                  label="Zadajte heslo"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      password: event.target.value,
                    })
                  }
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />{" "}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: "100%" }}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" fontSize="0.875rem">
                  Ešte nemáte účet?{" "}
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      fontWeight: "500",
                      color: "inherit",
                    }}
                  >
                    {" "}
                    Zaregistrujte sa
                  </Link>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" fontSize="0.875rem">
                  Zabudli ste heslo?{" "}
                  <Link
                    to="/resetpassword"
                    style={{
                      textDecoration: "none",
                      fontWeight: "500",
                      color: "inherit",
                    }}
                  >
                    {" "}
                    Obnoviť heslo
                  </Link>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{ padding: "1rem" }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Prihlásiť sa
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ContentNotLogged>
    </>
  );
};
