import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { ChoosePairingSystem } from "./ChoosePairingSystem";
import { ChooseSport } from "./ChooseSport";
import { SettingsTournament } from "./SettingsTournament";
import { NewDay } from "./NewDay";

export const CreateTournamentContent = (
  step,
  tournamentId,
  newTournament,
  setNewTournament
) => {
  console.log(tournamentId);

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

  useEffect(() => {
    console.log(newTournament);
  });

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
