import { appTheme } from "../../themes/appTheme";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";

import { FormikTextField } from "../../components/FormikTextField";
import { EmailField } from "../../components/Authentication/EmailField";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Formik, Form } from "formik";
import { schema } from "../../validationSchemas/playerProfile/validationSchema.js";
const validationSchema = schema;

export const PlayerProfileData = (props) => {
  const { isLoading, handleEditPlayer, playerData } = props;
  return (
    <Accordion
      sx={{
        width: "100%",
        backgroundColor: appTheme.palette.primary.main,
        color: "white",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="sunglow" />}
        aria-controls="player-credentials"
        id="player-credentials-header"
        sx={{ textAlign: "center" }}
      >
        <Typography>Upraviť údaje hráča</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {!isLoading && (
          <>
            {" "}
            <Formik
              initialValues={{
                firstName: playerData.first_name,
                lastName: playerData.last_name,
                email: playerData.email,
                elo: playerData.elo,
              }}
              onSubmit={(values) => handleEditPlayer(values)}
              validationSchema={validationSchema}
            >
              {({ values, handleChange, errors, touched, handleBlur }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormikTextField
                        name="firstName"
                        label="Krstné meno"
                        color="white"
                      ></FormikTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormikTextField
                        name="lastName"
                        label="Priezvisko"
                        color="white"
                      ></FormikTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <EmailField name="email" label="Email"></EmailField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormikTextField
                        name="elo"
                        label="ELO"
                        color="white"
                      ></FormikTextField>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      color="sunglow"
                      variant="contained"
                      sx={{ marginBlock: "1rem" }}
                      startIcon={<EditOutlinedIcon />}
                      type="submit"
                    >
                      Potvrdiť úpravu údajov
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
