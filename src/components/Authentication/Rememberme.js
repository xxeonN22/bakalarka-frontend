import { Checkbox, Typography } from "@mui/material";
import { appTheme } from "../../themes/appTheme";

export const Rememberme = ({ values, handleChange }) => {
  return (
    <>
      <Checkbox
        id="rememberMe"
        name="rememberMe"
        checked={values.rememberMe}
        onChange={handleChange}
        sx={{
          color: appTheme.palette.sunglow.main,
          "&.Mui-checked": {
            color: appTheme.palette.sunglow.main,
          },
        }}
      ></Checkbox>
      <Typography variant="h2" fontSize="0.875rem">
        Zapamätať prihlásenie
      </Typography>
    </>
  );
};
