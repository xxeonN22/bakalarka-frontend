import React, { useState, useEffect } from "react";
import { ChooseAddingStyle } from "./ChooseAddingStyle";
import { NewPlayerData } from "./NewPlayerData";

export const PlayersContent = (step) => {
  const [selectedStyle, setSelectedStyle] = useState("");
  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  useEffect(() => {
    console.log(selectedStyle);
  });

  switch (step) {
    case 0:
      return (
        <ChooseAddingStyle
          selectedStyle={selectedStyle}
          handleStyleChange={handleStyleChange}
        ></ChooseAddingStyle>
      );
    case 1:
      return <NewPlayerData selectedStyle={selectedStyle}></NewPlayerData>;
    default:
      return null;
  }
};
