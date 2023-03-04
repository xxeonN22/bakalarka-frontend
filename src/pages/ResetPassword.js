import React, { useState } from "react";
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
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

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
                  Obnova hesla
                </Typography>
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
                  variant="contained"
                  onClick={() => console.log(formData)}
                >
                  Obnoviť heslo
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ContentNotLogged>
    </>
  );
};
