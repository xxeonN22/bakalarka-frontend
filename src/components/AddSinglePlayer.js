import { Grid, TextField, MenuItem } from "@mui/material";

export const AddSinglePlayer = (props) => {
  const { handleSinglePlayerChange, newPlayerData, groups } = props;
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          onChange={(e) =>
            handleSinglePlayerChange("firstName", e.target.value)
          }
          value={newPlayerData.firstName}
          label="Zadajte krstné meno"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          InputProps={{
            inputProps: {
              pattern: "[A-Za-z]+",
              title: "Prosím, zadajte len písmená abecedy",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          onChange={(e) => handleSinglePlayerChange("lastName", e.target.value)}
          value={newPlayerData.lastName}
          label="Zadajte priezvisko"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          InputProps={{
            inputProps: {
              pattern: "[A-Za-z]+",
              title: "Prosím, zadajte len písmená abecedy",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          onChange={(e) => handleSinglePlayerChange("email", e.target.value)}
          value={newPlayerData.email}
          label="Zadajte email"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          InputProps={{
            inputProps: {
              pattern: "[A-Za-z]+",
              title: "Prosím, zadajte len písmená abecedy",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          select
          label="Vyberte skupinu"
          value={newPlayerData.group}
          onChange={(e) => handleSinglePlayerChange("group", e.target.value)}
          multiple // Add the multiple prop
          fullWidth
          margin="normal"
          required
        >
          {groups.map((group) => (
            <MenuItem key={group.group_name} value={group.group_name}>
              {group.group_name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          onChange={(e) => handleSinglePlayerChange("elo", e.target.value)}
          value={newPlayerData.elo}
          label="Zadajte hodnotu ELO"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          InputProps={{
            inputProps: {
              pattern: "[0-9]*",
              title: "Prosím, zadajte len numerickú hodnotu",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
