import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { PlayersContent } from "./PlayersContent";
import { CreateTournamentContent } from "./CreateTournamentContent";

import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";

export const StepperClean = (props) => {
  const [newTournament, setNewTournament] = useState({
    selectedSport: "",
    selectedPairingStyle: "",
    tournamentName: "",
    maxNumberOfSets: "",
    maxNumberOfPoints: "",
    numberOfGroups: "",
    numberOfRounds: "",
    gameDays: [],
  });

  const { tournamentId } = props;
  console.log(`Inside stepper: ${tournamentId}`);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === props.numberOfSteps - 1) {
      if (props.typeOfContent === "createTournament") {
        console.log(newTournament);
      }
      props.handleCloseModal();
      if (props.handleClose) {
        props.handleClose();
      }
    } else {
      if (activeStep === 0 && newTournament.selectedSport === "") {
        // User has not selected a sport, set error message and prevent next step
        alert("Please select a sport");
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ marginBottom: "1rem" }}
      >
        {props.data.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {props.typeOfContent === "addPlayers" && PlayersContent(activeStep)}
      {props.typeOfContent === "createTournament" &&
        CreateTournamentContent(
          activeStep,
          props.tournamentId,
          newTournament,
          setNewTournament
        )}
      <Box>
        <Box
          sx={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<NavigateBeforeIcon></NavigateBeforeIcon>}
          >
            Späť
          </Button>
          <Button
            endIcon={
              activeStep === props.numberOfSteps - 1 ? (
                <DoneIcon />
              ) : (
                <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
              )
            }
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === props.numberOfSteps - 1
              ? "Potvrdiť pridanie"
              : "Ďalej"}
          </Button>
        </Box>
      </Box>
    </>
  );
};
