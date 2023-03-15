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
  InputAdornment,
  IconButton,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
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
        <Container
          maxWidth="md"
          sx={{
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
                  paddingInline: "1rem",
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
                <TextField
                  required
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
              <Grid item xs={12}>
                <TextField
                  required
                  id="user-password-repeat"
                  label="Zadajte znovu heslo"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      repeatPassword: event.target.value,
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
                md={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" fontSize="0.875rem">
                  Už máte účet?{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      fontWeight: "500",
                      color: "inherit",
                    }}
                    to="/login"
                  >
                    {" "}
                    Prihláste sa
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
                  Registrovať sa
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ContentNotLogged>
    </>
  );
};
