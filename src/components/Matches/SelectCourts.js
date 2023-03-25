import { TextFieldIncrement } from "../TextFieldIncrement";

export const SelectCourts = (props) => {
  const { setSelectedCourts, numberOfCourts } = props;
  return (
    <TextFieldIncrement
      value={1}
      functionName={setSelectedCourts}
      label="Počet kurtov"
      id="number-of-courts"
      max={numberOfCourts}
      min={1}
    ></TextFieldIncrement>
  );
};
