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
      <Button sx={{ padding: "1rem" }} variant="contained" type="submit">
        Vytvoriť nové heslo
      </Button>
    </Grid>
  );
};
