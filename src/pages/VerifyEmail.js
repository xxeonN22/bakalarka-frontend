import { useState } from "react";
import { api } from "../axios/axios";
import { useParams, useNavigate } from "react-router-dom";

import { Paper, Container, Button, Typography, Box } from "@mui/material";

import { containerStyle } from "../components/ResetPassword/resetPasswordStyles";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { AlertMessage } from "../components/Alert/AlertMessage";

export const VerifyEmail = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const { hash } = useParams();

  const handleVerifyEmail = async () => {
    try {
      const response = await api.put(`/verifyemail/${hash}`);
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
          <Paper
            sx={{
              padding: "2rem",
              width: "90%",
            }}
          >
            <Typography textAlign="center" variant="h2" fontSize="1.5rem">
              Overenie emailu
            </Typography>
            <Typography
              textAlign="center"
              variant="h2"
              fontSize="1.1rem"
              lineHeight="1.7rem"
            >
              Overte email kliknutím na tlačidlo nižšie
            </Typography>
            {responseMessage && (
              <AlertMessage
                typeOfResponse={responseMessage.type}
                responseMessage={responseMessage.message}
                setResponseMessage={setResponseMessage}
              ></AlertMessage>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <Button variant="contained" onClick={handleVerifyEmail}>
                Overiť email
              </Button>
            </Box>
          </Paper>
        </Container>
      </ContentNotLogged>
    </>
  );
};
