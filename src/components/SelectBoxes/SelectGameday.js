import { SelectBox } from "../SelectBox";

export const SelectGameday = ({
  handleGameDayChange,
  selectedGameDay,
  gameDays,
}) => {
  return (
    <SelectBox
      id="select-game-day"
      labelContent="Vyberte hrací deň"
      labelId="select-game-day-label"
      label="Vyberte hrací deň"
      onChangeFunction={handleGameDayChange}
      selectValue={selectedGameDay}
      itemArray={gameDays}
    ></SelectBox>
  );
};
