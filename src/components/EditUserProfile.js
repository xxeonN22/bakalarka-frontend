import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { api } from "../axios/axios";
import { Grid, TextField, Box, Button, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { schema } from "../validationSchemas/EditUserProfile/validationSchema";
import { appTheme } from "../themes/appTheme";
const validationSchema = schema;

export const EditUserProfile = (props) => {
  const { setResponseMessage, handleDialogClose, handleClose } = props;
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/tournaments/adminData`);
        setAdminData({
          firstName: response.data[0].first_name,
          lastName: response.data[0].last_name,
          email: response.data[0].email,
        });
        setLoaded(true);
      } catch (error) {
        if (error.response) {
          setResponseMessage(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    })();
  }, []);

  const handleEditUserData = async (userCredentials) => {
    try {
      const response = await api.put(`/tournaments/adminData`, userCredentials);
      setResponseMessage(response.data);
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
      {loaded && (
        <Formik
          initialValues={{
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            email: adminData.email,
          }}
          onSubmit={(values) => {
            handleEditUserData(values);
            handleDialogClose();
            if (handleClose) {
              handleClose();
            }
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, errors, touched, handleBlur }) => (
            <Form>
              <Grid container spacing={2} sx={{ marginBlock: "1rem" }}>
                <Grid item xs={12}>
                  <Typography textAlign="center" variant="h2" fontSize="1.5rem">
                    Vaše údaje
                  </Typography>
                </Grid>
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
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="sunglow"
                  type="submit"
                  variant="contained"
                  endIcon={<EditOutlinedIcon />}
                >
                  Upraviť údaje
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
