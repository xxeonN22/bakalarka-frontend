import { useState } from "react";
import { Box, TextField, IconButton, FormControl } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const TextFieldIncrement = (props) => {
  const { value, functionName, label, id, max, min } = props;

  const [currentValue, setCurrentValue] = useState(value);

  const handleIncrement = () => {
    const newValue = currentValue + 1;
    if (max && newValue > max) {
      setCurrentValue(max);
      functionName(max);
    } else {
      setCurrentValue(newValue);
      functionName(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = currentValue - 1;
    if (min && newValue < min) {
      setCurrentValue(min);
      functionName(min);
    } else {
      setCurrentValue(newValue);
      functionName(newValue);
    }
  };

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value) || 0;
    if (max && newValue > max) {
      setCurrentValue(max);
      functionName(max);
    } else if (min && newValue < min) {
      setCurrentValue(min);
      functionName(min);
    } else {
      setCurrentValue(newValue);
      functionName(newValue);
    }
  };

  return (
    <FormControl fullWidth>
      <TextField
        label={label}
        id={id}
        value={currentValue}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <IconButton sx={{ padding: 0 }} onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
              <IconButton sx={{ padding: 0 }} onClick={handleDecrement}>
                <RemoveIcon />
              </IconButton>
            </Box>
          ),
        }}
        max={max}
        min={min}
      ></TextField>
    </FormControl>
  );
};
