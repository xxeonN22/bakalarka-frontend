import { useState } from "react";
import { nanoid } from "nanoid";
import { appTheme } from "../themes/appTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ChoosePairingSystem } from "./ChoosePairingSystem";
import { ChooseSport } from "./ChooseSport";
import { SettingsTournament } from "./SettingsTournament";
import { NewDay } from "./NewDay";

import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const StepperCreateTournament = ({
  handleCloseModal,
  setResponseMessage,
  message,
  handleCreateTournamet,
}) => {
  const numberOfSteps = 4;
  const [activeStep, setActiveStep] = useState(1);
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));

  const [newTournament, setNewTournament] = useState({
    selectedSport: "",
    selectedPairingStyle: "",
    tournamentName: "",
    maxNumberOfSets: 1,
    maxNumberOfPoints: 999,
    numberOfCourts: 1,
    numberOfGroups: 1,
    numberOfRounds: 1,
    gameDays: [],
  });

  const [stepperMessage, setStepperMessage] = useState({
    selectSportMessage: "",
    selectPairingMessage: "",
    tournamentSettingsMessage: "",
    gameDaysMessage: "",
  });

  const validateStep = () => {
    switch (activeStep) {
      case 1:
        if (newTournament.selectedSport === "") {
          setStepperMessage({
            ...stepperMessage,
            selectSportMessage:
              "Prosím, vyberte nejaký šport predtým, ako budete pokračovať na ďalší krok!",
          });
          return false;
        }
        break;
      case 2:
        if (newTournament.selectedPairingStyle === "") {
          setStepperMessage({
            ...stepperMessage,
            selectPairingMessage:
              "Prosím, vyberte druh párovania hráčov v zápasoch predtým, ako budete pokračovať na ďalší krok!",
          });
          return false;
        }
        break;
      case 3:
        if (newTournament.tournamentName === "") {
          setStepperMessage({
            ...stepperMessage,
            tournamentSettingsMessage:
              "Prosím, zadajte názov turnaja predtým, ako budete pokračovať na ďalší krok!",
          });
          return false;
        }
        break;
      case 4:
        if (newTournament.gameDays.length === 0) {
          setStepperMessage({
            ...stepperMessage,
            gameDaysMessage:
              "Prosím, vytvorte aspoň jeden hrací deň predtým, ako vytvoríte turnaj!",
          });
          return false;
        }

        for (let i = 0; i < newTournament.gameDays.length; i++) {
          if (newTournament.gameDays[i].groups.length === 0) {
            setStepperMessage({
              ...stepperMessage,
              gameDaysMessage:
                "Vo všetkých hracích dňoch musí byť vybratá aspoň jedna skupina!",
            });
            return false;
          }
          if (newTournament.gameDays[i].round === "") {
            setStepperMessage({
              ...stepperMessage,
              gameDaysMessage:
                "Každý hrací deň musí byť súčasťou niektorého z kôl!",
            });
            return false;
          }
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === numberOfSteps) {
        handleCreateTournamet(newTournament);
        handleCloseModal();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
          date: new Date(),
          time: new Date(),
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
      case 1:
        return (
          <>
            <ChooseSport
              stepperMessage={stepperMessage}
              setStepperMessage={setStepperMessage}
              newTournament={newTournament}
              handleTournamentSettingsChange={handleTournamentSettingsChange}
            ></ChooseSport>
          </>
        );
      case 2:
        return (
          <>
            <ChoosePairingSystem
              stepperMessage={stepperMessage}
              setStepperMessage={setStepperMessage}
              newTournament={newTournament}
              handleTournamentSettingsChange={handleTournamentSettingsChange}
            ></ChoosePairingSystem>
          </>
        );
      case 3:
        return (
          <>
            <SettingsTournament
              stepperMessage={stepperMessage}
              setStepperMessage={setStepperMessage}
              newTournament={newTournament}
              handleTournamentSettingsChange={handleTournamentSettingsChange}
            ></SettingsTournament>
          </>
        );
      case 4:
        return (
          <>
            <NewDay
              stepperMessage={stepperMessage}
              setStepperMessage={setStepperMessage}
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

  const createTournamentSteps = [
    "Vyberte šport",
    "Vyberte párovací systém",
    "Zadajte údaje o turnaji",
    "Zvoľte dátum konania turnaja",
  ];

  return (
    <>
      <Stepper
        activeStep={activeStep - 1}
        alternativeLabel
        sx={{ marginBlock: "1rem" }}
      >
        {createTournamentSteps.map((label, index) => (
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
            disabled={activeStep === 1}
            onClick={handleBack}
            startIcon={<NavigateBeforeIcon></NavigateBeforeIcon>}
          >
            Späť
          </Button>
          <Button
            endIcon={
              activeStep === numberOfSteps ? (
                <DoneIcon />
              ) : (
                <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
              )
            }
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === numberOfSteps ? "Vytvoriť" : "Ďalej"}
          </Button>
        </Box>
      </Box>
    </>
  );
};
