import { appTheme } from "../themes/appTheme";
import { Field } from "formik";
import { TextField } from "@mui/material";

export const FormikTextField = ({ name, label, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          error={form.touched[name] && Boolean(form.errors[name])}
          helperText={form.touched[name] && form.errors[name]}
          sx={{
            width: "100%",
            ".MuiInputLabel-outlined": {
              color: "white",
              "&.Mui-focused": {
                color: "white",
              },
              "&.Mui-error": {
                color: appTheme.palette.error.main,
              },
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: appTheme.palette.error.main,
              },
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& input": {
                color: "white",
              },
            },
          }}
        />
      )}
    </Field>
  );
};
