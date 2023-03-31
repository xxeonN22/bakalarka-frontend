import { appTheme } from "../themes/appTheme";
import { Field } from "formik";
import { TextField } from "@mui/material";

export const FormikTextField = ({ name, label, color, ...rest }) => {
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
              color: color,
              "&.Mui-focused": {
                color: color,
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
                borderColor: color,
              },
              "&:hover fieldset": {
                borderColor: color,
              },
              "&.Mui-focused fieldset": {
                borderColor: color,
              },
              "& input": {
                color: color,
              },
            },
          }}
        />
      )}
    </Field>
  );
};
