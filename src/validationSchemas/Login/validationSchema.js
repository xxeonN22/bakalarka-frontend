import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .required("Email musí byť zadaný")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Neplatný tvar emailovej adresy"
    ),
  password: yup.string().required("Heslo musí byť zadané"),
  rememberMe: yup.boolean(),
});
