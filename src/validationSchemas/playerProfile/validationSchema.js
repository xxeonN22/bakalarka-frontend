import * as yup from "yup";

// Schema pouzita pri overenie spravnosti vstupu od uzivatela pri uprave udajov o hracovi
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
  elo: yup
    .number()
    .min(500, "Minimálna hodnota musí byť aspoň 500")
    .max(5000, "Maximálna povolená hodnota je 5000")
    .typeError("Hodnota ELO musí byť číselná hodnota")
    .required("Hodnota ELO musí byť zadaná"),
});
