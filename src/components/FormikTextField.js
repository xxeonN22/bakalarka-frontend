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
          sx={{ width: "100%" }}
        />
      )}
    </Field>
  );
};
