import React, { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { nanoid } from "nanoid";
import { ChoosePairingSystem } from "./ChoosePairingSystem";
import { ChooseSport } from "./ChooseSport";
import { SettingsTournament } from "./SettingsTournament";
import { NewDay } from "./NewDay";

import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";

export const StepperCreateTournament = (props) => {
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

  useEffect(() => {
    console.log(newTournament);
  });

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === props.numberOfSteps - 1) {
      if (props.typeOfContent === "createTournament") {
        console.log(newTournament);
      }
      props.handleCloseModal();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const incrementValue = (fieldName) => {
    setNewTournament((prevState) => {
      const fieldValue =
        prevState[fieldName] === ""
          ? prevState[fieldName]
          : parseInt(prevState[fieldName], 10);
      return {
        ...prevState,
        [fieldName]: parseInt(fieldValue + 1, 10),
      };
    });
  };

  const decrementValue = (fieldName) => {
    setNewTournament((prevState) => {
      const fieldValue =
        prevState[fieldName] === ""
          ? prevState[fieldName]
          : parseInt(prevState[fieldName], 10);
      if (fieldValue > 0) {
        return {
          ...prevState,
          [fieldName]: fieldValue - 1,
        };
      }
      return prevState;
    });
  };

  const handleTournamentSettingsChange = (name, value) => {
    setNewTournament(() => ({
      ...newTournament,
      [name]: value,
    }));
  };

  const handleAddGameDay = () => {
    setNewTournament(() => ({
      ...newTournament,
      gameDays: [
        ...newTournament.gameDays,
        {
          id: nanoid(),
          groups: [],
          round: "",
          date: "",
          time: "",
        },
      ],
    }));
  };

  function handleRemoveGameDay(gameDayId) {
    const updatedGameDays = newTournament.gameDays.filter(
      (gameDay) => gameDay.id !== gameDayId
    );
    setNewTournament({ ...newTournament, gameDays: updatedGameDays });
  }

  const handleGameDayChange = (id, name, value) => {
    setNewTournament(() => ({
      ...newTournament,
      gameDays: newTournament.gameDays.map((gameDay) => {
        if (gameDay.id === id) {
          return {
            ...gameDay,
            [name]: value,
          };
        }
        return gameDay;
      }),
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <ChooseSport
              newTournament={newTournament}
              handleTournamentSettingsChange={handleTournamentSettingsChange}
            ></ChooseSport>
          </>
        );
      case 1:
        return (
          <>
            <ChoosePairingSystem
              newTournament={newTournament}
              handleTournamentSettingsChange={handleTournamentSettingsChange}
            ></ChoosePairingSystem>
          </>
        );
      case 2:
        return (
          <>
            <SettingsTournament
              handleInput={handleInput}
              incrementValue={incrementValue}
              decrementValue={decrementValue}
              newTournament={newTournament}
              handleTournamentSettingsChange={handleTournamentSettingsChange}
            ></SettingsTournament>
          </>
        );
      case 3:
        return (
          <>
            <NewDay
              newTournament={newTournament}
              handleAddGameDay={handleAddGameDay}
              handleRemoveGameDay={handleRemoveGameDay}
              handleGameDayChange={handleGameDayChange}
            ></NewDay>
          </>
        );
      default:
        return null;
    }
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
      <Box sx={{ marginTop: "3rem" }}>{getStepContent(activeStep)}</Box>
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
