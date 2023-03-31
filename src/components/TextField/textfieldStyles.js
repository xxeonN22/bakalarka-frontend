import { appTheme } from "../../themes/appTheme";
export const textFieldStyles = () => {
  return {
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
  };
};
