import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Formik, Form } from "formik";
import { schema } from "../../validationSchemas/playerProfile/validationSchema.js";
const validationSchema = schema;

export const PlayerProfileData = (props) => {
  const { isLoading, handleEditPlayer, playerData } = props;
  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
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
                      <TextField
                        required
                        fullWidth
                        id="firstName"
                        label="Meno"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Priezvisko"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="elo"
                        label="Elo"
                        name="elo"
                        value={values.elo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.elo && Boolean(errors.elo)}
                        helperText={touched.elo && errors.elo}
                      ></TextField>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      sx={{ marginTop: "1rem" }}
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
