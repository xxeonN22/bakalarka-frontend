import { Field } from "formik";
import { ShowPasswordTextField } from "../ShowPasswordTextField.js";

export const PasswordField = ({ name, label, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <ShowPasswordTextField
          id={name}
          label={label}
          value={field.value}
          handleChange={field.onChange}
          handleBlur={field.onBlur}
          error={form.touched[name] && Boolean(form.errors[name])}
          helperText={form.touched[name] && form.errors[name]}
          {...rest}
        />
      )}
    </Field>
  );
};
