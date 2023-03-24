import { Checkbox, Typography } from "@mui/material";

export const Rememberme = ({ values, handleChange }) => {
  return (
    <>
      <Checkbox
        id="rememberMe"
        name="rememberMe"
        checked={values.rememberMe}
        onChange={handleChange}
      ></Checkbox>
      <Typography variant="h2" fontSize="0.875rem">
        Zapamätať prihlásenie
      </Typography>
    </>
  );
};
