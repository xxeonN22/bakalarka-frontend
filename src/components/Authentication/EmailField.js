import { Field } from "formik";
import { EmailTextField } from "../EmailTextField.js";

export const EmailField = ({ name, label, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <EmailTextField
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
