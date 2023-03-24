import { SelectBox } from "../SelectBox";

export const SelectRound = ({ handleRoundChange, selectedRound, rounds }) => {
  return (
    <SelectBox
      id="select-round"
      labelContent="Vyberte kolo"
      labelId="select-round-label"
      label="Vyberte kolo"
      onChangeFunction={handleRoundChange}
      selectValue={selectedRound}
      itemArray={rounds}
    ></SelectBox>
  );
};
