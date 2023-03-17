import { TextField, InputAdornment } from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export const EmailTextField = (props) => {
  const { id, label, setFormData, formData } = props;
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
