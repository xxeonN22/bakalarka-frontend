import { Grid, Typography } from "@mui/material";

const getTodaysDate = () => {
  const todaysDate = new Date();
  const day = todaysDate.getDate();
  const month = todaysDate.getMonth() + 1;
  const year = todaysDate.getFullYear();
  const date = `${day}.${month}.${year}`;
  return date;
};

export const TypographySection = (props) => {
  const { organizer, tournamentName } = props;
  return (
    <>
      <Grid item xs={12}>
        <Typography>Zdravíme Vás, dnes je {getTodaysDate()}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {organizer} Váš pozýva, aby ste sa zúčastnili turnaja {tournamentName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Prosím, potvrďte svoju účasť kliknutím na príslušný hrací deň!
        </Typography>
      </Grid>
    </>
  );
};
