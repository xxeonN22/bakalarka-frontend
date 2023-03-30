import { useState } from "react";
import { api } from "../axios/axios";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { appTheme } from "../themes/appTheme";
import { DialogWindow } from "./DialogWindow";
import { Button, IconButton, Grid, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const validationSchema = yup.object({
  subject: yup.string().required("Subjekt musí byť zadaný"),
  text: yup.string().required("Správa musí byť zadaná"),
});

export const EmailSettings = (props) => {
  const {
    checkedBoxes,
    setCheckedBoxes,
    setAllChecked,
    tournamentId,
    setResponseMessage,
  } = props;
  const [dialogState, setDialogState] = useState(false);

  const handleSendEmail = async (values) => {
    try {
      const response = await api.post(
        `/players/tournament/${tournamentId}/sendEmail`,
        { checkedBoxes, values, tournamentId }
      );
      if (response.status === 200) {
        setCheckedBoxes([]);
        setAllChecked(false);
        setResponseMessage(response.data);
      } else {
        setResponseMessage(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
  };

  return (
    <>
      <Button
        color="sunglow"
        variant="contained"
        sx={{ width: "100%", padding: "1rem" }}
        onClick={() => {
          handleDialogOpen();
        }}
      >
        Poslať email
      </Button>
      <DialogWindow open={dialogState} handleCloseModal={handleDialogClose}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleDialogClose}
        >
          <CloseIcon></CloseIcon>
        </IconButton>

        <Formik
          initialValues={{ subject: "", text: "" }}
          onSubmit={(values) => {
            handleSendEmail(values);
            handleDialogClose();
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, errors, touched, handleBlur }) => (
            <Form>
              <Grid container gap={3} justifyContent="center">
                <Grid item xs={12}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: "1.5rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2rem",
                      textAlign: "center",
                      marginBottom: "1.5rem",
                      [appTheme.breakpoints.down("md")]: {
                        fontSize: "1.1rem",
                      },
                    }}
                  >
                    Zadajte údaje pre odoslanie emailu
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="subject"
                    label="Zadajte predmet emailu"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.subject && Boolean(errors.subject)}
                    helperText={touched.subject && errors.subject}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="text"
                    label="Zadajte správu pre príjimateľov"
                    name="text"
                    multiline
                    rows={5}
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.text && Boolean(errors.text)}
                    helperText={touched.text && errors.text}
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "2rem" }}
                    endIcon={<SendOutlinedIcon />}
                  >
                    Potvrdiť poslanie
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogWindow>
    </>
  );
};
