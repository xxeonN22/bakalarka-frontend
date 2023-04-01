import * as yup from "yup";

// Schema pouzita pri overeni spravnosti noveho hesla pouzita na stranke pre nastavenie noveho hesla
export const schema = yup.object({
  password: yup
    .string()
    .required("Heslo musí byť vyplnené")
    .min(8, "Heslo musí obsahovať aspoň 8 znakov")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Heslo musí obsahovať aspoň jedno veľké písmeno a jedno číslo"
    ),
  repeatPassword: yup
    .string()
    .required("Heslo musíte potvrdiť")
    .oneOf([yup.ref("password")], "Heslá sa nezhodujú"),
});
