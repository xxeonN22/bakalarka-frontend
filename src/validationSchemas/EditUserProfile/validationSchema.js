import * as yup from "yup";

export const schema = yup.object({
  firstName: yup.string().required("Meno musí byť zadané"),
  lastName: yup.string().required("Priezvisko musí byť zadané"),
  email: yup
    .string()
    .required("Email musí byť zadaný")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Neplatný tvar emailovej adresy"
    ),
});
