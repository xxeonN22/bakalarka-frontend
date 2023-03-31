import { appTheme } from "../themes/appTheme";
import { useState } from "react";
import { ChooseAddingStyle } from "../components/AddPlayers/ChooseAddingStyle";
import { NewPlayerData } from "./NewPlayerData";

import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const StepperAddPlayer = (props) => {
  const {
    handleCloseModal,
    handleClose,
    tournamentId,
    handleAddPlayers,
    handleImportPlayers,
  } = props;

  const numberOfSteps = 2;
  const [stepperMessage, setStepperMessage] = useState({
    selectAddMethodMessage: "",
    playersCredentialsMessage: "",
  });

  const [activeStep, setActiveStep] = useState(1);

  const [selectedStyle, setSelectedStyle] = useState("");
  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  const [newPlayerData, setNewPlayerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    group: "",
    elo: 1500,
  });

  const handleSinglePlayerChange = (name, value) => {
    setNewPlayerData(() => ({
      ...newPlayerData,
      [name]: value,
    }));
  };

  const [newPlayersData, setNewPlayersData] = useState(null);
  const handleMultiplePlayersChange = (event) => {
    setNewPlayersData(event.target.value);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const validateStep = () => {
    switch (activeStep) {
      case 1:
        if (selectedStyle === "") {
          setStepperMessage({
            ...stepperMessage,
            selectAddMethodMessage:
              "Prosím, vyberte spôsob pridania hráčov, predtým ako budete pokračovať ďalej",
          });
          return false;
        }
        break;
      case 2:
        if (selectedStyle === "add-single-player") {
          if (Object.values(newPlayerData).includes("")) {
            setStepperMessage({
              ...stepperMessage,
              playersCredentialsMessage:
                "Prosím vyplňte všetky polia, ktoré sú označené *",
            });
            return false;
          }
        }

        if (selectedStyle === "add-multiple-players") {
          if (Object.values(newPlayersData).includes("")) {
            setStepperMessage({
              ...stepperMessage,
              playersCredentialsMessage: "Musíte pridať aspoň jedného hráča!",
            });
            return false;
          }
        }

        if (selectedStyle === "import-players-from-file" && !selectedFile) {
          setStepperMessage({
            ...stepperMessage,
            playersCredentialsMessage:
              "Prosím vyberte súbor s hráčmi, ktorých chcete pridať do turnaja!",
          });
          return false;
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
        if (selectedStyle === "import-players-from-file") {
          handleImportPlayers(selectedStyle, selectedFile);
        } else {
          handleAddPlayers(selectedStyle, newPlayerData, newPlayersData);
        }
        handleClose();
        handleCloseModal();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <ChooseAddingStyle
              selectedStyle={selectedStyle}
              handleStyleChange={handleStyleChange}
              stepperMessage={stepperMessage}
              setStepperMessage={setStepperMessage}
              handleClose={handleClose}
              handleCloseModal={handleCloseModal}
            ></ChooseAddingStyle>
          </>
        );
      case 2:
        return (
          <>
            <NewPlayerData
              tournamentId={tournamentId}
              selectedStyle={selectedStyle}
              stepperMessage={stepperMessage}
              setStepperMessage={setStepperMessage}
              newPlayerData={newPlayerData}
              handleSinglePlayerChange={handleSinglePlayerChange}
              handleMultiplePlayersChange={handleMultiplePlayersChange}
              handleFileChange={handleFileChange}
              handleClose={handleClose}
              handleCloseModal={handleCloseModal}
            ></NewPlayerData>
          </>
        );
      default:
        return null;
    }
  };

  const addPlayerSteps = [
    "Vyberte spôsob pridania hráčov",
    "Zadajte údaje o hráčoch",
  ];

  return (
    <>
      <Stepper
        activeStep={activeStep - 1}
        alternativeLabel
        sx={{
          marginBlock: "1rem",
          "& .MuiStepIcon-root": {
            color: appTheme.palette.primary.dark,
          },
          "& .MuiStepIcon-active": {
            color: appTheme.palette.sunglow.main,
          },
          "& .MuiStepLabel-label": {
            color: appTheme.palette.primary.main,
          },
          "& .MuiStepLabel-active": {
            color: appTheme.palette.primary.main,
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: appTheme.palette.sunglow.main,
          },
        }}
      >
        {addPlayerSteps.map((label, index) => (
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
            color="primary"
            variant="contained"
            disabled={activeStep === 1}
            onClick={handleBack}
            startIcon={<NavigateBeforeIcon></NavigateBeforeIcon>}
          >
            Späť
          </Button>
          <Button
            color="sunglow"
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
            {activeStep === numberOfSteps ? "Pridať" : "Ďalej"}
          </Button>
        </Box>
      </Box>
    </>
  );
};
