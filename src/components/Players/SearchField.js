import { appTheme } from "../../themes/appTheme";
import { TextField } from "@mui/material";

export const SearchField = (props) => {
  const { id, label, value, handleChange, left, right } = props;
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      size="small"
      value={value}
      onChange={handleChange}
      sx={{
        [appTheme.breakpoints.down("md")]: {
          position: "absolute",
          top: -50,
          left: { left },
          right: { right },
          width: "30%",
        },
        [appTheme.breakpoints.down("sm")]: {
          width: "47%",
        },
      }}
    />
  );
};
