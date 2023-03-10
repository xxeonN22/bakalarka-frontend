import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export const SelectBox = (props) => {
  const {
    id,
    labelContent,
    labelId,
    label,
    onChangeFunction,
    selectValue,
    itemArray,
  } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{labelContent}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={selectValue}
        onChange={onChangeFunction}
        label={label}
      >
        {id === "select-group" &&
          itemArray.map((group) => {
            return (
              <MenuItem key={group.group_name} value={group.group_name}>
                {group.group_name}
              </MenuItem>
            );
          })}
        {id === "select-round" &&
          itemArray.map((round) => {
            return (
              <MenuItem key={round.round_number} value={round.round_number}>
                {round.round_number}
              </MenuItem>
            );
          })}
        {id === "select-game-day" &&
          itemArray.map((gameDay) => {
            return (
              <MenuItem key={gameDay} value={gameDay}>
                {gameDay}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};
