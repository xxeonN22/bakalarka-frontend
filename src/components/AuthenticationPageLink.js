import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { appTheme } from "../themes/appTheme";

export const AuthenticationPageLink = (props) => {
  const { text, to, boldText } = props;
  return (
    <Typography variant="h2" fontSize="0.875rem">
      {text}{" "}
      <Link
        to={to}
        style={{
          textDecoration: "none",
          fontWeight: "500",
          color: appTheme.palette.sunglow.main,
        }}
      >
        {" "}
        {boldText}
      </Link>
    </Typography>
  );
};
