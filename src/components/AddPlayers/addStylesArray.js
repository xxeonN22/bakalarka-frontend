import AddOnePlayerIcon from "../../icons/AddOnePlayerIcon";
import AddMultiplePlayersIcon from "../../icons/AddMultiplePlayersIcon";
import ImportPlayersIcon from "../../icons/ImportPlayersIcon";

export const addStylesArray = () => {
  const addingStyles = [
    {
      name: "Pridať jedného hráča",
      value: "add-single-player",
      icon: <AddOnePlayerIcon width={40} height={40} fill={"black"} />,
    },
    {
      name: "Pridať viacerých hráčov",
      value: "add-multiple-players",
      icon: <AddMultiplePlayersIcon width={40} height={40} fill={"black"} />,
    },
    {
      name: "Import hráčov zo súboru .csv",
      value: "import-players-from-file",
      icon: <ImportPlayersIcon width={40} height={40} fill={"black"} />,
    },
  ];
  return addingStyles;
};
