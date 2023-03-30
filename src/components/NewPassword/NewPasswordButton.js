import { Grid, Button } from "@mui/material";

export const NewPasswordButton = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        color="sunglow"
        sx={{ padding: "1rem" }}
        variant="contained"
        type="submit"
      >
        Vytvoriť nové heslo
      </Button>
    </Grid>
  );
};
