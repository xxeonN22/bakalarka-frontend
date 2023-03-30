import { appTheme } from "../themes/appTheme";
import { TextField, InputAdornment } from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export const EmailTextField = (props) => {
  const { id, label, handleChange, handleBlur, value, error, helperText } =
    props;
  return (
    <TextField
      required
      name={id}
      id={id}
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailOutlinedIcon sx={{ color: "white" }} />{" "}
          </InputAdornment>
        ),
      }}
      sx={{
        width: "100%",
        ".MuiInputLabel-outlined": {
          color: "white",
          "&.Mui-focused": {
            color: "white",
          },
          "&.Mui-error": {
            color: appTheme.palette.error.main,
          },
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: appTheme.palette.error.main,
          },
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
          "& input": {
            color: "white",
          },
        },
      }}
    ></TextField>
  );
};
