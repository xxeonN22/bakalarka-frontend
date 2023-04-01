import * as yup from "yup";

// Schema pouzita pri overeni spravnosti vstupov od uzivatela pri uprave udajov o uzivatelovi
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
    .required("Email musí byť zadaný")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Neplatný tvar emailovej adresy"
    ),
});
