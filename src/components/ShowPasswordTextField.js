import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const ShowPasswordTextField = (props) => {
  const { setFormData, formData, id, label } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      required
      name={id}
      id={id}
      label={label}
      onChange={(event) =>
        setFormData({
          ...formData,
          [id]: event.target.value,
        })
      }
      type={showPassword ? "text" : "password"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlinedIcon />{" "}
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
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ width: "100%" }}
    ></TextField>
  );
};
