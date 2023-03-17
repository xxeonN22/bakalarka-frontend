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
            <EmailOutlinedIcon />{" "}
          </InputAdornment>
        ),
      }}
      sx={{ width: "100%" }}
    ></TextField>
  );
};
