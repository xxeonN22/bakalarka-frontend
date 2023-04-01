import * as yup from "yup";

// Schema pouzita pre overenie spravnosti emailu na stranke kde uzivatel zada email pre obnovu hesla
export const schema = yup.object({
  email: yup
    .string()
    .required("Email musí byť zadaný")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Neplatný tvar emailovej adresy"
    ),
});
