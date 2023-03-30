import { appTheme } from "../themes/appTheme";
import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const ShowPasswordTextField = (props) => {
  const { id, label, handleChange, handleBlur, value, error, helperText } =
    props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      variant="outlined"
      required
      name={id}
      id={id}
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
      type={showPassword ? "text" : "password"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlinedIcon sx={{ color: "white" }} />{" "}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff sx={{ color: "white" }} />
              ) : (
                <Visibility sx={{ color: "white" }} />
              )}
            </IconButton>
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
