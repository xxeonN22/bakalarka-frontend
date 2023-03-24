import { SelectBox } from "../SelectBox";

export const SelectGroup = ({ handleGroupChange, selectedGroup, groups }) => {
  return (
    <SelectBox
      id="select-group"
      labelContent="Vyberte skupinu"
      labelId="select-group-label"
      label="Vyberte skupinu"
      onChangeFunction={handleGroupChange}
      selectValue={selectedGroup}
      itemArray={groups}
    ></SelectBox>
  );
};
