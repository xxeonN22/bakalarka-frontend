import { appTheme } from "../../themes/appTheme";
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const generateMatchesGridStyle = {
  display: "flex",
  justifyContent: "center",
};

const generateMatches = {
  paddingBlock: "1rem",
  width: "32%",
  marginBlock: "2rem",
  [appTheme.breakpoints.down("md")]: {
    width: "100%",
  },
};

export const GenerateButton = (props) => {
  const { handleGenerateClick } = props;
  return (
    <Grid item xs={12} sx={generateMatchesGridStyle}>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={generateMatches}
        onClick={handleGenerateClick}
      >
        Vygenerovať zápasy
      </Button>
    </Grid>
  );
};
