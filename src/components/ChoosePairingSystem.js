import { Grid, Paper, Alert } from "@mui/material";

export const ChoosePairingSystem = (props) => {
  const {
    stepperMessage,
    setStepperMessage,
    handleTournamentSettingsChange,
    newTournament,
  } = props;

  const pairingSystems = [
    {
      name: "Švajčiarsky systém (každý s každým 1x)",
      value: "svajciarsky-system",
    },
    {
      name: "Švajčiarsky systém (každý s každým 2x)",
      value: "kazdy-s-kazdym-2x",
    },
  ];

  return (
    <>
      {stepperMessage.selectPairingMessage && (
        <Alert
          sx={{ marginBlock: "1rem" }}
          severity={"error"}
          onClose={() => {
            setStepperMessage({
              ...stepperMessage,
              selectPairingMessage: null,
            });
          }}
        >
          {stepperMessage.selectPairingMessage}
        </Alert>
      )}
      <Grid container spacing={2}>
        {pairingSystems.map((system) => (
          <Grid item xs={12} sm={6} key={system.value}>
            <Paper
              sx={{
                paddingBlock: "1rem",
                paddingInline: "1rem",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  newTournament.selectedPairingStyle === system.value
                    ? "#1f2736"
                    : "inherit",
                transition: "background-color 0.5s ease",
              }}
            >
              <label
                style={{ textAlign: "center", width: "100%" }}
                htmlFor={system.value}
              >
                <input
                  style={{ display: "none" }}
                  checked={newTournament.selectedPairingStyle === system.value}
                  onChange={(e) =>
                    handleTournamentSettingsChange(
                      "selectedPairingStyle",
                      e.target.value
                    )
                  }
                  type="radio"
                  id={system.value}
                  name="radio-buttons-pairing"
                  value={system.value}
                />
                <span
                  style={{
                    color:
                      newTournament.selectedPairingStyle === system.value
                        ? "white"
                        : "black",
                  }}
                >
                  {system.name}
                </span>
              </label>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
