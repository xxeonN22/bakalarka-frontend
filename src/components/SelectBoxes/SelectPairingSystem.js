import { SelectBox } from "../SelectBox";

export const SelectPairingSystem = ({
  handlePairingChange,
  selectedPairing,
  pairingSystems,
}) => {
  return (
    <SelectBox
      id="select-pairing"
      labelContent="Párovací systém"
      labelId="select-pairing-system-label"
      label="Párovací systém"
      onChangeFunction={handlePairingChange}
      selectValue={selectedPairing}
      itemArray={pairingSystems}
    ></SelectBox>
  );
};
