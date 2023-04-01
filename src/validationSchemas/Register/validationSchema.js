import * as yup from "yup";

// Schema pouzita pre overenie spravnosti vstupov od uzivatela pri registracii
export const schema = yup.object({
  firstName: yup
    .string()
    .matches(
      /^[A-ZÁÄČĎÉĚÍĽĹŇÓÔŔŘŠŤÚŮÝŽ][a-zA-ZáäčďéěíľĺňóôŕřšťúůýžÁÄČĎÉĚÍĽĹŇÓÔŔŘŠŤÚŮÝŽ]{2,}$/,
      "Krstné meno musí začínať veľkým písmenom, musí mať aspoň 3 znaky a môže obsahovať len písmená abecedy"
    )
    .required("Meno musí byť vyplnené"),
  lastName: yup
    .string()
    .matches(
      /^[A-ZÁÄČĎÉĚÍĽĹŇÓÔŔŘŠŤÚŮÝŽ][a-zA-ZáäčďéěíľĺňóôŕřšťúůýžÁÄČĎÉĚÍĽĹŇÓÔŔŘŠŤÚŮÝŽ]{2,}$/,
      "Priezvisko musí začínať veľkým písmenom, musí mať aspoň 3 znaky a môže obsahovať len písmená abecedy"
    )
    .required("Meno musí byť vyplnené"),
  email: yup
    .string()
    .required("Email musí byť vyplnený")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Neplatný tvar emailovej adresy"
    ),
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
